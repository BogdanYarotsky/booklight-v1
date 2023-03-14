import { NgModule } from '@angular/core';

import { MaterialModule } from './_modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularModule } from './_modules/angular.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchPageComponent,
    HomePageComponent
  ],
  imports: [
    AngularModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
