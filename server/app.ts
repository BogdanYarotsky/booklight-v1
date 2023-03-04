import { Book } from "../shared/book";
import { Constants } from "../shared/constants";
import express from "express";


const book: Book = {
    title: "test",
    url: "test",
    imageUrl: "test",
    reviews: 500,
    rating: 4.2,
    authors: [],
    year: 2009
};

console.log(book);
console.log(Constants.APP_NAME);

const app = express();
const port = process.env.PORT || 3000;
app.get(["/", "/:name"], (req, res) => {
    const greeting = "<h1>Hello From Node on Fly!</h1>";
    const name = req.params["name"];
    if (name) {
        res.send(greeting + "</br>and hello to " + name);
    } else {
        res.send(greeting);
    }
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

