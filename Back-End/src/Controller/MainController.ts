import axios from "axios";
import { Request, Response } from "express";
const TwitterAccountSchema = require("../Model/TwitterAccountSchema");
const ProfileChromeSchema = require("../Model/ProfileChromeSchema");
const ScheduledSocialInteractionSchema = require("../Model/ScheduledSocialInteractionSchema");
const DetailScheduleInteractionSchema = require("../Model/DetailScheduleInteractionSchema");
const PuppeteerChrome = require("../Puppeteer/Chrome");
const cron = require("node-cron");

interface TwitterAccountObject {
    _id?: string;
    UserName: string;
    Password: string;
    AuthenticationCode: string;
    TypeAccount: string;
    ProfileChrome?: string;
}

interface CreateMulitpleAccountRequestBody {
    data: TwitterAccountObject[];
}

interface OpentMulitpleAccountRequestBody {
    data: TwitterAccountObject[];
}

interface ScheduleParams {
    ScheduleId: string;
}

interface CreateScheduleRequestBody {
    data: {
        Title: string;
        ContentText: string;
        AccountPicId: string;
        StartTime: Date;
        EndTime: Date;
        IntervalMinutes: number;
        AccountProposalIds: string[];
    };
}

const schedules: Record<string, any> = {}; // Lưu danh sách schedule

class MainController {
    static async isChromeAvailable(ws: string) {
        try {
            const response = await axios.get(`http://${ws}/json/version`);
            console.log("Chrome đang mở với WebSocket:", response.data.webSocketDebuggerUrl);
            return true;
        } catch (error) {
            console.log("Chrome chưa mở hoặc không có WebSocket.", error);
            return false;
        }
    }

    static async CreateMulitpleAccount(req: Request<{}, {}, CreateMulitpleAccountRequestBody>, res: Response) {
        const { data } = req.body;

        const excutablePath = process.env.EXECUTABLE_PATH as any;
        const userDataDir = process.env.USER_DATA_DIR as any;

        const arrayError = [];
        const arraySuccess = [];

        for (const item of data) {
            const account = await TwitterAccountSchema.findOne({
                UserName: item.UserName,
            }).exec();
            if (account) {
                arrayError.push({ ...item, isExisted: true });
                continue;
            }

            const profileChrome = await ProfileChromeSchema({
                ProfileName: `${item.TypeAccount}_${item.UserName}`,
                UsrDirPath: `${userDataDir}\\${item.TypeAccount}_${item.UserName}`,
                ExcutablePath: excutablePath,
            });
            const profileChromeResult = await profileChrome.save();

            const twitterAccount = new TwitterAccountSchema({
                ...item,
                ProfileChrome: profileChromeResult._id,
            });
            const accountResult = await twitterAccount.save();
            const accountExpand = await TwitterAccountSchema.findById(accountResult._id)
                .populate("ProfileChrome")
                .exec();
            arraySuccess.push(accountExpand);

            await PuppeteerChrome.createProfileChrome(accountExpand);
        }

        if (arrayError.length) {
            return res.status(400).send({ success: false, dataError: arrayError });
        }
        return res.status(200).send({ success: true, data: arraySuccess });
    }

    static async getAccounts(req: Request<{}, {}, any>, res: Response) {
        const { data } = req.body;
        const formSearch: Record<string, any> = {};

        if (data?.UserName) {
            formSearch["UserName"] = { $regex: data.UserName, $options: "i" };
        }

        if (data?.TypeAccount.length) {
            formSearch["TypeAccount"] = { $in: data.TypeAccount };
        }

        const listAccount = await TwitterAccountSchema.find(formSearch).populate("ProfileChrome").exec();
        return res.status(200).send({ success: true, data: listAccount });
    }

    static async createSchedule(req: Request<{}, {}, CreateScheduleRequestBody>, res: Response) {
        const { data } = req.body;

        const { AccountPicId, AccountProposalIds, EndTime, IntervalMinutes, StartTime, Title, ContentText } = data;
        const arrayError = [];
        const arraySuccess = [];

        const accountPic = await TwitterAccountSchema.findOne({
            _id: AccountPicId,
            TypeAccount: "ACCOUNT_PIC",
            ScheduleInteractionId: { $ne: null },
        }).exec();

        if (accountPic !== null) {
            arrayError.push({
                ...accountPic,
                message: `${accountPic.UserName} is progress in other schedule`,
            });
        }

        const schedulle = await ScheduledSocialInteractionSchema({
            Title: Title,
            ContentText: ContentText,
            StartTime: StartTime,
            EndTime: EndTime,
            IntervalMinutes: IntervalMinutes,
            IsProgress: false,
        });
        const scheduleResult = await schedulle.save();

        await TwitterAccountSchema.findOneAndUpdate(
            {
                _id: AccountPicId,
                TypeAccount: "ACCOUNT_PIC",
                ScheduleInteractionId: null,
            },
            {
                $set: {
                    ScheduleInteractionId: scheduleResult._id,
                },
            },
            { new: true }
        ).exec();

        const newAccountPic = await TwitterAccountSchema.findById(AccountPicId)
            .populate("ScheduleInteractionId")
            .populate("ProfileChrome")
            .exec();

        arraySuccess.push(newAccountPic);

        for (const accountId of AccountProposalIds) {
            await TwitterAccountSchema.findOneAndUpdate(
                {
                    _id: accountId,
                    TypeAccount: "ACCOUNT_PROPOSAL",
                    ScheduleInteractionId: null,
                },
                {
                    $set: {
                        ScheduleInteractionId: scheduleResult._id,
                    },
                }
            ).exec();

            const newAccountProposal = await TwitterAccountSchema.findById(accountId)
                .populate("ScheduleInteractionId")
                .populate("ProfileChrome")
                .exec();

            arraySuccess.push(newAccountProposal);
            console.log(newAccountProposal);
        }

        const step = 60 / IntervalMinutes;
        schedules[scheduleResult._id] = cron.schedule(`0 */${step} * * * *`, () => {
            console.log("⏱ Running every 5 seconds:", new Date().toLocaleTimeString());
        });

        if (arrayError.length) {
            return res.status(400).send({ success: false, dataError: arrayError });
        }
        return res.status(200).send({ success: true, data: arraySuccess });
    }

    static async startScheduleById(req: Request<ScheduleParams, {}, {}>, res: Response) {
        const { ScheduleId } = req.params;
        if (!schedules[ScheduleId]) {
            return res.status(400).send({ success: false, message: `${ScheduleId} is not exists` });
        }

        schedules[ScheduleId].start();
        return res.status(200).send({ success: true, message: `${ScheduleId} started schedule` });
    }

    static async stopScheduleById(req: Request<ScheduleParams, {}, {}>, res: Response) {
        const { ScheduleId } = req.params;
        if (!schedules[ScheduleId]) {
            return res.status(400).send({ success: false, message: `${ScheduleId} is not exists` });
        }

        schedules[ScheduleId].stop();
        return res.status(200).send({ success: true, message: `${ScheduleId} stopped schedule` });
    }

    static async openChrome(req: Request<{}, {}, OpentMulitpleAccountRequestBody>, res: Response) {
        const { data } = req.body;

        const dataOpened: any[] = [];
        const dataClosed: any[] = [];

        for (const item of data) {
            const twitterAccount = await TwitterAccountSchema.findById(item._id).populate("ProfileChrome").exec();

            if (!twitterAccount) {
                dataClosed.push(twitterAccount);
                continue;
            }

            const { BaseWsEndpoint, id: profileChromeId } = twitterAccount.ProfileChrome;
            let isLaunchProfileChrome = false;

            if (!BaseWsEndpoint || (BaseWsEndpoint && !(await MainController.isChromeAvailable(BaseWsEndpoint)))) {
                isLaunchProfileChrome = true;
            }

            try {
                if (isLaunchProfileChrome) {
                    const wsEndpoint = await PuppeteerChrome.openProfileChrome(twitterAccount);
                    const baseWsEndpoint = wsEndpoint.split("/devtools/browser")[0].replace("ws://", "");

                    const profileChrome = await ProfileChromeSchema.findByIdAndUpdate(
                        profileChromeId,
                        {
                            $set: {
                                BaseWsEndpoint: baseWsEndpoint,
                                FullWsEndpoint: wsEndpoint,
                            },
                        },
                        { new: true, lean: true }
                    );

                    twitterAccount.ProfileChrome = profileChrome;
                    dataOpened.push(twitterAccount);
                } else {
                    await PuppeteerChrome.connectProfileChrome(twitterAccount);
                    dataOpened.push(twitterAccount);
                }
            } catch (error) {
                console.log("error: ", error);
                dataClosed.push(twitterAccount);
            }
        }

        return res.status(200).send({ success: true, dataOpened, dataClosed });
    }
}

module.exports = MainController;
