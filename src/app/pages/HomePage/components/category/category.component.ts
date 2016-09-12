import { Component, OnInit, Input } from '@angular/core';

import './category.component.scss';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit{
  @Input() category;
  ngOnInit() {

  }
}
