import { Component, OnInit, Input } from '@angular/core';
//import { Category } from '../../services/category.model';

import './categories-list.component.scss';

@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
})

export class CategoriesListComponent implements OnInit{
  @Input() categories;
  ngOnInit() {
  }
}
