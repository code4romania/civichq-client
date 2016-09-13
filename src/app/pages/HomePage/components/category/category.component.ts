import { Component, OnInit, Input } from '@angular/core';

import './category.component.scss';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit{
  @Input() category;
  private noOfApps = 3;

  getSlides() {
    return new Array(Math.ceil(this.category.apps.length / this.noOfApps));
  }


  ngOnInit() {
    console.log(this.getSlides())
  }
}
