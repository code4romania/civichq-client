import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/category.service';
import { Category } from '../../services/category.model';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
})

export class HomeComponent implements OnInit{
    categories: Category[] = [];
    selectedCategory: number = 1;

    constructor(private categoriesService: CategoriesService){ }

    ngOnInit() {
        this.categoriesService.getCategoriesWithApps()
          .subscribe(res => this.categories = res);
    }

    onCategoryClick(id) {
      this.selectedCategory = id;
    }
}
