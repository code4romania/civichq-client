import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'categories-nav',
    templateUrl: './categories-nav.component.html',
})

export class CategoriesNavComponent implements OnInit{
  @Input() categories;
  @Output() onCategoryClick = new EventEmitter();

  ngOnInit() {

  }

  onClick(id) {
    this.onCategoryClick.emit(id);
  }
}
