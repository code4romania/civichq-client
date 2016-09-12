import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';

import { HomeRouting } from './config/home.routing';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryComponent } from './components/category/category.component';

import { CategoriesService } from './services/category.service';

@NgModule({
  imports: [
    BrowserModule,
    HomeRouting,
    HttpModule
  ],
  declarations: [
    HomeComponent,
    CategoriesNavComponent,
    CategoriesListComponent,
    CategoryComponent,
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    CategoriesService
  ]
})
export class HomeModule { }
