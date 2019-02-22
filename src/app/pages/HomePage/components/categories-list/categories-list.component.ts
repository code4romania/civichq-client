import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent implements OnInit{
  @Input() categories;
  ngOnInit() {
  }
}
