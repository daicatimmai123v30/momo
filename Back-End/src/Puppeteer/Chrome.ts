const puppeteer = require("puppeteer");
import axios from "axios";
import dotenv from "dotenv";

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

class PuppeteerChrome {
    static async runProfileChrome(user: any) {
        const excutablePath = process.env.EXECUTABLE_PATH as any;
        const userDataDir = process.env.USER_DATA_DIR as any;
        const browser = await puppeteer.launch({
            headless: false, // Chạy có giao diện
            executablePath: excutablePath, // Đường dẫn Chrome
            userDataDir: userDataDir,
            ignoreDefaultArgs: false,
            args: [...ARGS],
        });

        const homeTwitter = await browser.newPage();
        await homeTwitter.goto("https://x.com/home");

        let isLogin = true;
        try {
            const homeNavigation = await homeTwitter.waitForSelector(
                'nav[role="navigation"] a[data-testid="AppTabBar_Home_Link"]',
                { timeout: 3000 }
            );
            console.log(homeNavigation);
            if (homeNavigation) {
                console.log("✅ Đang ở trang Home");
            } else {
                isLogin = false;
            }
        } catch (error) {
            isLogin = false;
            console.log("⚠ Không tìm thấy Home Navigation, có thể đang ở trang Login");
        }

        // if (!isLogin) {
        //     const twitterAccount = {
        //         userName: "InvisibleSoyCJS",
        //         password: "Rumdangiu123",
        //         funtionalAuthen: "ZMI3ZZEZWA664DJO"
        //     }

        //     const response = await axios.get(`https://2fa.live/tok/${twitterAccount.funtionalAuthen}`);
        //     const { token } = response.data;
        //     homeTwitter.waitForSelector(
        //         'input[autocomplete="username"]',
        //     ).then(async () => {
        //         await homeTwitter.type('input[autocomplete="username"]', twitterAccount.userName);

        //         await homeTwitter.waitForSelector('button[type="button"]', { visible: true })

        //         await homeTwitter.evaluate(() => {
        //             const span = Array.from(document.querySelectorAll('span'))
        //                 .find(el => el.innerText.trim() === "Next");
        //             const button = span?.closest('button');
        //             button?.click();
        //         });

        //         await homeTwitter.waitForSelector('input[autocomplete="current-password"]', { visible: true })
        //         await homeTwitter.type('input[autocomplete="current-password"]', twitterAccount.password);

        //         await homeTwitter.evaluate(() => {
        //             const span = Array.from(document.querySelectorAll('span'))
        //                 .find(el => el.innerText.trim() === "Log in");
        //             const button = span?.closest('button');
        //             button?.click();
        //         });

        //         await homeTwitter.waitForSelector('input[data-testid="ocfEnterTextTextInput"]', { visible: true })
        //         await homeTwitter.type('input[data-testid="ocfEnterTextTextInput"]', token);

        //         await homeTwitter.waitForSelector('button', { visible: true })
        //         await homeTwitter.evaluate(() => {
        //             const span = Array.from(document.querySelectorAll('span'))
        //                 .find(el => el.innerText.trim() === "Next");
        //             const button = span?.closest('button');
        //             button?.click();
        //         });

        //         // homeTwitter.$('button[type="button"] span').then((result) => {
        //         //     console.log(result);

        //         //     await homeTwitter.click('button[type="button"][text="Next"]');
        //         // })
        //     })
        // }
        console.log("Chrome đã mở thành công!");
    }

    static async createProfileChrome(user: any) {
        let isLogin = true;
        console.log(user);
        try {
            const browser = await puppeteer.launch({
                headless: false, // Chạy có giao diện
                executablePath: user.ProfileChrome.ExcutablePath, // Đường dẫn Chrome
                userDataDir: user.ProfileChrome.UsrDirPath,
                ignoreDefaultArgs: false,
                args: [...ARGS],
            });

            // const homeTwitter = await browser.newPage();
            // await homeTwitter.goto("https://x.com/home");

            // try {
            //     const homeNavigation = await homeTwitter.waitForSelector('nav[role="navigation"] a[data-testid="AppTabBar_Home_Link"]', { timeout: 3000 })
            //     if (!homeNavigation) {
            //         isLogin = false;
            //     }
            // } catch (error) {
            //     isLogin = false;
            // }

            // if (!isLogin) {
            //     const response = await axios.get(`https://2fa.live/tok/${user.AuthenticationCode}`);
            //     const { token } = response.data;
            //     homeTwitter.waitForSelector(
            //         'input[autocomplete="username"]',
            //     ).then(async () => {

            //         // Input UserName
            //         await homeTwitter.type('input[autocomplete="username"]', user.UserName);

            //         await homeTwitter.waitForSelector('button[type="button"]', { visible: true })

            //         // Hanle click Next button
            //         await homeTwitter.evaluate(() => {
            //             const span = Array.from(document.querySelectorAll('span'))
            //                 .find(el => el.innerText.trim() === "Next");
            //             const button = span?.closest('button');
            //             button?.click();
            //         });

            //         // Input Password
            //         await homeTwitter.waitForSelector('input[autocomplete="current-password"]', { visible: true })
            //         await homeTwitter.type('input[autocomplete="current-password"]', user.Password);

            //         // Hanle click Login button
            //         await homeTwitter.evaluate(() => {
            //             const span = Array.from(document.querySelectorAll('span'))
            //                 .find(el => el.innerText.trim() === "Log in");
            //             const button = span?.closest('button');
            //             button?.click();
            //         });

            //         // Input 2FA
            //         await homeTwitter.waitForSelector('input[data-testid="ocfEnterTextTextInput"]', { visible: true })
            //         await homeTwitter.type('input[data-testid="ocfEnterTextTextInput"]', token);

            //         // Hanle click FA button
            //         await homeTwitter.waitForSelector('button', { visible: true })
            //         await homeTwitter.evaluate(() => {
            //             const span = Array.from(document.querySelectorAll('span'))
            //                 .find(el => el.innerText.trim() === "Next");
            //             const button = span?.closest('button');
            //             button?.click();
            //         });

            //         // homeTwitter.$('button[type="button"] span').then((result) => {
            //         //     console.log(result);

            //         //     await homeTwitter.click('button[type="button"][text="Next"]');
            //         // })
            //     })
            // }
        } catch (error) {
            console.log("Không thể create profile chrome");
        }
    }

    static async openProfileChrome(user: any) {
        const browser = await puppeteer.launch({
            headless: false, // Chạy có giao diện
            executablePath: user.ProfileChrome.ExcutablePath, // Đường dẫn Chrome
            userDataDir: user.ProfileChrome.UsrDirPath,
            ignoreDefaultArgs: false,
            args: [...ARGS],
        });

        const homeTwitter = await browser.newPage();
        await homeTwitter.goto("https://x.com/home");
        return await browser.wsEndpoint();
    }

    static async connectProfileChrome(user: any) {
        const browser = await puppeteer.connect({
            browserWSEndpoint: `${user.ProfileChrome.FullWsEndpoint}`,
        });
        const pages = await browser.pages();
        if (pages[0]) {
            await pages[0].bringToFront();
        }
    }
}

module.exports = PuppeteerChrome;
