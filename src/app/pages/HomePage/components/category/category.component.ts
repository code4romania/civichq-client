import { Component, OnInit, Input } from '@angular/core';

import './category.component.scss';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit{
  @Input() category;
  private noOfApps = 3;
  private theSlides = [];

  getSlides() {
    return new Array(Math.ceil(this.category.apps.length / this.noOfApps));
  }

  onResize(event) {
    const size = event.target.innerWidth;
    const oldNoOfApps = this.noOfApps;
    if(size > 1200) {
      this.noOfApps = 3;
    } else if(size <=1200 && size > 750) {
      this.noOfApps = 2;
    } else {
      this.noOfApps = 1;
    }
    if(oldNoOfApps != this.noOfApps) {
      this.theSlides = [];
      setTimeout(() => {
        this.theSlides = this.getSlides();
      }, 50);
    }
  }

  ngOnInit() {
    console.log("init slides");
    this.theSlides = this.getSlides();
  }
}
