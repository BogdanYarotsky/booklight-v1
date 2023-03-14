import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <a routerLink="/search"><button class="btn btn-success" > Go to search </button></a>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent { }
