import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import './categories-nav.component.scss';

@Component({
    selector: 'categories-nav',
    templateUrl: './categories-nav.component.html',
})

export class CategoriesNavComponent implements OnInit{
  @Input() categories;
  @Input() selectedId;
  @Output() onCategoryClick = new EventEmitter();

  ngOnInit() {

  }

  onClick(id) {
    this.onCategoryClick.emit(id);
  }

  getClass(id) {

    return id == this.selectedId ? "CategoriesNav-Category--selected" : "";
  }
}
