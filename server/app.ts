import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import express from "express";
import Goodreads from "./goodreads";
import { SEARCH_ENDPOINT } from "../shared/constants";
import { Browser } from "puppeteer-core";
import { CHROME_ARGS, DEBUG_PORT, DEBUG_CHROME_PATH, DOCKER_CHROME_PATH, NODE_EXIT_EVENTS } from "./config"

async function main() {
    const browser = await startBrowser();
    const goodreads = new Goodreads(browser);
    const app = express();


    app.use('/', express.static('../client/dist/client'));


    app.get("/api/books", (_, res) => res.send("<h1>Welcome to Booklight</h1>"));
    app.get(SEARCH_ENDPOINT, async (req, res) => {
        const query = req.query.q;
        if (query) {
            const books = await goodreads.getBooks(query as string);
            res.send(books);
        }
        else {
            res.redirect("/");
        }
    });

    const port = process.env.PORT ?? DEBUG_PORT;
    const server = app.listen(port, () => console.log('Listen on port ' + port));
    NODE_EXIT_EVENTS.forEach(event => {
        process.on(event, () => {
            browser?.close();
            server?.close();
            process.exit();
        });
    })
}

main().catch(console.error);

async function startBrowser(): Promise<Browser> {
    return await puppeteer
        .use(StealthPlugin())
        .launch({
            executablePath: process.env.IS_DOCKER ? DOCKER_CHROME_PATH : DEBUG_CHROME_PATH,
            args: CHROME_ARGS
        });
}

