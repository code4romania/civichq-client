import { Injectable } from '@angular/core';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./../../../services/base.service";

@Injectable()
export class CategoriesService extends BaseService {
    constructor(private http:Http) {
        super(http);
    }
    getCategories() {
        const url = `${this.rootAddress + 'categories'}`;
        return this.http.get(url)
            .map((response: Response) => {
                return response.json().map(
                    category => this.parseApiCategory(category)
                );
            })
    }
    parseApiCategory(apiCategory) {
        return {
            id: apiCategory.Id,
            catname: apiCategory.CatName,
        }
    }
}