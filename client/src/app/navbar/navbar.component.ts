import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
<header>
  <mat-toolbar color="primary">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <span>{{title}}</span>
    <span class="example-spacer"></span>
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button>
  </mat-toolbar>
</header>
  `,
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  title: string = "Booklight";
}
