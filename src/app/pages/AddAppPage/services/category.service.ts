import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./../../../services/base.service";

@Injectable()
export class CategoriesService extends BaseService {
    constructor(private http:Http, private auth: AuthService) {
        super(http);
    }
    getCategories() {
        const url = `${this.rootAddress + 'categories'}`;
        return this.auth.loginSentinel().flatMap(() => {
            return this.http.get(url, {headers: this.auth.headers})
                .map((response: Response) => {
                    return response.json().map(
                        category => this.parseApiCategory(category)
                    );
                })
        })

    }
    parseApiCategory(apiCategory) {
        return {
            id: apiCategory.Id,
            catname: apiCategory.CatName,
        }
    }
}