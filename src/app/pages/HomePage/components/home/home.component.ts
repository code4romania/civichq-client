import { CategoriesService } from './../../../../services/category.service';
import { Component, OnInit } from '@angular/core';

import { Category } from './../../../../services/category.model';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
})

export class HomeComponent implements OnInit{
    categories: Category[] = [];
    categoryNames = [];
    selectedCategory: number = 1;

    showSpinner = true;

    constructor(private categoriesService: CategoriesService){ }

    ngOnInit() {
        this.categoriesService.getCategoriesWithApps()
          .subscribe(res => {
            this.categories = res;
            this.categoryNames =
              res.map(category => { return {name: category.catname, id: category.id} });
            this.showSpinner = false;
          });
    }

    onCategoryClick(id) {
      this.selectedCategory = id;
      this.categories = this.categoriesService.getReorderedCategories(this.categories, id)
    }


}
