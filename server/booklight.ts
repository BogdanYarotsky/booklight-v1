import Book from "../shared/book";
import puppeteer, { Browser, Page, PuppeteerLaunchOptions, WaitForOptions } from "puppeteer-core";

const launchOptions: PuppeteerLaunchOptions = {
    executablePath: process.env.IS_DOCKER ? '/usr/bin/google-chrome' : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
};

const waitForOptions: WaitForOptions = {
    waitUntil: 'domcontentloaded'
}

class BooklightService {
    constructor(private browser: Browser) { }

    async getGoodreadsBooks(searchQuery: string): Promise<Book[]> {
        const page = await this.browser.newPage();
        await this.interceptUselessRequests(page);
        await page.goto(`https://www.goodreads.com/search?page=1&q=${searchQuery}`, waitForOptions);
        const books =
            page.close();
        return [];
    }

    async stop() {
        await this.browser.close();
    }

    private async parseBooks(page: Page): Promise<Book[]> {
        return await page.$$eval("tr[itemtype='http://schema.org/Book']",
            rows => rows.map<Book>(row => {
                const titleElement = row.querySelector(".bookTitle");
                const authors: string[] = [];
                // const ratingInfo = 
                return {
                    title: titleElement?.textContent ?? "",
                    url: titleElement?.getAttribute("href") ?? "",
                    imageUrl: row.querySelector(".bookCover")?.getAttribute("src") ?? "",
                    // authors: row.querySelectorAll(".authorName").forEach(a => a.textContent),
                    authors: authors,
                    rating: 5,
                    reviews: 100,
                    year: 2000,
                };
            }));
    }

    //title: r.querySelector(".bookTitle")?.textContent ?? ""

    private async interceptUselessRequests(page: Page) {
        await page.setRequestInterception(true);
        page.on("request", r => {
            if (r.resourceType() === "document") {
                r.continue();
            } else {
                r.abort();
            }
        });
    }
}

interface GoodreadsBookRow {
    title: string;
    url: string;
    imageUrl: string;
    rating: string;
    reviews: string;
    authors: string;
    year: string;
}

class Booklight {
    async start() {
        const browser = await puppeteer.launch(launchOptions);
        return new BooklightService(browser);
    }
}

declare const booklight: Booklight;
export default booklight;
