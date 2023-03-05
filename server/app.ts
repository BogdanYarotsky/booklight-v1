import puppeteer from "puppeteer-core";
import express from "express";
import booklight from "./booklight";

console.log('im running!')

async function main() {
    const browser = await puppeteer.launch({
        executablePath: process.env.IS_DOCKER ? '/usr/bin/google-chrome' : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox']
    });
    process.on('SIGINT', async () => await browser.close());
    process.on('SIGTERM', async () => await browser.close());

    console.log("hello world!");
    const app = express();
    const port = process.env.PORT || 8080;

    app.get(["/", "/:name"], async (req, res) => {
        const greeting = "<h1>Hello From Node on Fly!</h1>";
        const name = req.params["name"];
        if (name) {
            const page = await browser.newPage();
            await page.goto('https://example.com/', { waitUntil: 'domcontentloaded' });
            const content = await page.content();
            await page.close();
            res.send(content);
        } else {
            res.send(greeting);
        }
    });

    const server = app.listen(port);
    console.log('started listening on port ' + port);
}


main().catch(console.error);





