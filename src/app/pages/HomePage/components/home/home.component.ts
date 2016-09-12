import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/category.service';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
})

export class HomeComponent implements OnInit{
    constructor(private categoriesService: CategoriesService){ }
    ngOnInit() {
      this.categoriesService.getCategories().subscribe(res => {
        console.log(res)
      })
      
    }
}
