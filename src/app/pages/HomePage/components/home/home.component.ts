import {CategoriesService} from '../../../../services/category.service';
import {Component, OnInit} from '@angular/core';

import {Category} from '../../../../services/category.model';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
})

export class HomeComponent implements OnInit {
    categories: Category[] = [];
    categoryNames = [];
    selectedCategory: number = 1;

    constructor(private categoriesService: CategoriesService) {
    }

    async ngOnInit() {
        this.categories = await this.categoriesService.getCategoriesWithApps();
        this.categoryNames = this.categories.map(category => {
            return {name: category.catname, id: category.id}
        });
    }

    onCategoryClick(id) {
        this.selectedCategory = id;
        this.categories = this.categoriesService.getReorderedCategories(this.categories, id)
    }


}
