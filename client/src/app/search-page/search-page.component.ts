import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../_services/books.service';
import { Observable } from 'rxjs';
import Book from '@shared/book';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  $books?: Observable<Book[]>;

  constructor(
    private route: ActivatedRoute,
    private service: BooksService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.queryParamMap.subscribe(params => {
    //   const query = params.get("q");
    //   if (query) {
    //     this.$books = this.service.getBooks();
    //   }
    //   else {
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}
