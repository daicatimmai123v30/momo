"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = require("mongoose");
const express_1 = __importDefault(require("express"));
const fs = require("fs");
const path = require("path");
const MainRouter = require("./Controller/MainRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3001", // Chỉ cho phép React gọi API
    credentials: true,
}));
const EXECUTABLE_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = "C:\\Users\\OS\\AppData\\Local\\Google\\Chrome\\MMO Data";
const ARGS = [
    // "--allow-pre-commit-input",
    // "--disable-background-networking",
    // "--disable-background-timer-throttling",
    // "--disable-backgrounding-occluded-windows",
    // "--disable-breakpad",
    // "--disable-client-side-phishing-detection",
    // "--disable-component-extensions-with-background-pages",
    // "--disable-crash-reporter",
    // "--disable-default-apps",
    // "--disable-dev-shm-usage",
    // "--disable-extensions",
    // "--disable-hang-monitor",
    // "--disable-infobars",
    // "--disable-ipc-flooding-protection",
    // "--disable-popup-blocking",
    // "--disable-prompt-on-repost",
    // "--disable-renderer-backgrounding",
    // "--disable-search-engine-choice-screen",
    // "--disable-sync",
    // "--export-tagged-pdf",
    // "--force-color-profile=srgb",
    // "--generate-pdf-document-outline",
    // "--metrics-recording-only",
    // "--no-first-run",
    // "--password-store=basic",
    // "--use-mock-keychain",
    // "--enable-features=PdfOopif",
    "--no-default-browser-check",
    "--no-first-run",
    "--disable-features=Translate,AcceptCHFrame,MediaRouter,OptimizationHints,ProcessPerSiteUpToMainFrameThreshold,IsolateSandboxedIframes",
    "--remote-debugging-port=0",
    "--flag-switches-begin",
    "--flag-switches-end",
    "about:blank",
];
const userDataPath = path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "User Data");
const localStatePath = path.join(userDataPath, "Local State");
const connectionString = process.env.ATLAS_URI || "";
mongoose
    .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Error:", err));
function getChromeProfilesWithNames() {
    if (!fs.existsSync(localStatePath)) {
        console.log("Không tìm thấy file Local State của Chrome.");
        return;
    }
    const localState = JSON.parse(fs.readFileSync(localStatePath, "utf-8"));
    const profiles = localState.profile.info_cache;
    return Object.entries(profiles).map(([profileDir, profileInfo]) => {
        return { profileDir, profileInfo };
    });
}
// app.get("/", (req: Request, res: Response) => {
//     (async () => {
//         const result = getChromeProfilesWithNames();
//         const browser = await puppeteer.launch({
//             headless: false, // Chạy có giao diện
//             executablePath: EXECUTABLE_PATH, // Đường dẫn Chrome
//             userDataDir: USER_DATA_DIR,
//             ignoreDefaultArgs: false,
//             args: [...ARGS]
//         });
//         const homeTwitter = await browser.newPage();
//         await homeTwitter.goto("https://x.com/home");
//         let isLogin = true;
//         try {
//             const homeNavigation = await homeTwitter.waitForSelector('nav[role="navigation"] a[data-testid="AppTabBar_Home_Link"]', { timeout: 3000 })
//             console.log(homeNavigation);
//             if (homeNavigation) {
//                 console.log("✅ Đang ở trang Home");
//             } else {
//                 isLogin = false;
//             }
//         } catch (error) {
//             isLogin = false
//             console.log("⚠ Không tìm thấy Home Navigation, có thể đang ở trang Login");
//         }
//         // if (!isLogin) {
//         //     const twitterAccount = {
//         //         userName: "InvisibleSoyCJS",
//         //         password: "Rumdangiu123",
//         //         funtionalAuthen: "ZMI3ZZEZWA664DJO"
//         //     }
//         //     const response = await axios.get(`https://2fa.live/tok/${twitterAccount.funtionalAuthen}`);
//         //     const { token } = response.data;
//         //     homeTwitter.waitForSelector(
//         //         'input[autocomplete="username"]',
//         //     ).then(async () => {
//         //         await homeTwitter.type('input[autocomplete="username"]', twitterAccount.userName);
//         //         await homeTwitter.waitForSelector('button[type="button"]', { visible: true })
//         //         await homeTwitter.evaluate(() => {
//         //             const span = Array.from(document.querySelectorAll('span'))
//         //                 .find(el => el.innerText.trim() === "Next");
//         //             const button = span?.closest('button');
//         //             button?.click();
//         //         });
//         //         await homeTwitter.waitForSelector('input[autocomplete="current-password"]', { visible: true })
//         //         await homeTwitter.type('input[autocomplete="current-password"]', twitterAccount.password);
//         //         await homeTwitter.evaluate(() => {
//         //             const span = Array.from(document.querySelectorAll('span'))
//         //                 .find(el => el.innerText.trim() === "Log in");
//         //             const button = span?.closest('button');
//         //             button?.click();
//         //         });
//         //         await homeTwitter.waitForSelector('input[data-testid="ocfEnterTextTextInput"]', { visible: true })
//         //         await homeTwitter.type('input[data-testid="ocfEnterTextTextInput"]', token);
//         //         await homeTwitter.waitForSelector('button', { visible: true })
//         //         await homeTwitter.evaluate(() => {
//         //             const span = Array.from(document.querySelectorAll('span'))
//         //                 .find(el => el.innerText.trim() === "Next");
//         //             const button = span?.closest('button');
//         //             button?.click();
//         //         });
//         //         // homeTwitter.$('button[type="button"] span').then((result) => {
//         //         //     console.log(result);
//         //         //     await homeTwitter.click('button[type="button"][text="Next"]');
//         //         // })
//         //     })
//         // }
//         console.log("Chrome đã mở thành công!");
//     })();
//     res.send("<h1>Nhiệt liệt chào mừng quý vị đại coder!</h1>");
// });
// app.post("/addMultipleProfiles", (req: Request, res: Response) => {
//     const { amount, id, currency } = req.body;
//     console.log(req.body);
//     res.send(req.body);
// })
app.use("/tools", MainRouter);
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
