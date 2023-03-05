import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import express from "express";
import Goodreads from "./goodreads";

console.log('im running!')

async function main() {
    const browser = await puppeteer
        .use(StealthPlugin())
        .launch({
            executablePath: process.env.IS_DOCKER ? '/usr/bin/google-chrome' : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: ['--no-sandbox']
        });

    const goodreads = new Goodreads(browser);

    console.log("hello world!");
    const app = express();
    const port = process.env.PORT || 8080;

    app.get(["/", "/:name"], async (req, res) => {
        const greeting = "<h1>Hello From Node!</h1>";
        const name = req.params["name"];
        if (name) {
            const books = await goodreads.getBooks(name);
            res.send(books);
        } else {
            res.send(greeting);
        }
    });

    const server = app.listen(port);
    console.log('started listening on port ' + port);
    server.on("close", () => console.log("server has shut down"));

    process.on('SIGINT', () => {
        browser.close();
        console.log("asked browser to stop");
        server.close();
    });
    process.on('SIGTERM', () => {
        browser.close();
        console.log("asked browser to stop");
        server.close();
    });
}

main().catch(console.error);





