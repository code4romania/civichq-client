import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit{
  @Input() category;
  ngOnInit() {

  }
}
