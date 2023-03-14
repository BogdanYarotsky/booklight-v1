import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import express from "express";
import Goodreads from "./goodreads";
import { SEARCH_ENDPOINT } from "../shared/constants";
import { Browser } from "puppeteer-core";
import { CHROME_ARGS, DEBUG_PORT, DEBUG_CHROME_PATH, NODE_EXIT_EVENTS } from "./config"
import path from "path";

async function main() {
    const browser = await startBrowser();
    const goodreads = new Goodreads(browser);

    const app = express();
    const angularPath = path.join(__dirname, '../client/dist');
    app.use('/', express.static(angularPath));
    app.get(SEARCH_ENDPOINT, async (req, res) => {
        const query = req.query.q;
        if (query) {
            const books = await goodreads.getBooks(query as string);
            res.send(books);
        }
        else {
            res.send([]);
        }
    });
    app.get('*', (_, res) => res.sendFile(path.join(angularPath, 'index.html')));
    const port = process.env.PORT ?? DEBUG_PORT;
    const server = app.listen(port, () => console.log('Listen on port http://localhost:' + port));

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
            executablePath: process.env.CHROME_BIN ?? DEBUG_CHROME_PATH,
            args: CHROME_ARGS
        });
}

