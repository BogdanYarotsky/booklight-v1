import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '@shared/book';
import { SEARCH_ENDPOINT } from '@shared/constants';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(SEARCH_ENDPOINT);
  }
}
