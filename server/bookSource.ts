import Book from "../shared/book";

export default interface BookSource {
    getBooks(searchQuery: string): Promise<Book[]>;
}
