import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  constructor(private router: Router) {
  }

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

}
