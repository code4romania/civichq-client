import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
//import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Category } from './category.model';
import { App } from './app.model';

declare var SERVER_ADDRESS: string;

@Injectable()
export class CategoriesService {

  apiUrl = SERVER_ADDRESS;//'http://localhost:8080/api';
  constructor(private http: Http, private auth: AuthService) {
    
   }

  getCategories() {

    return this.http.get(`${this.apiUrl}categories`)
      .map((response: Response) => {
        return response.json().map(
          category => this.parseApiCategory(category)
        );
      })
  }

  getApps() {
    return this.http.get(`${this.apiUrl}approvedapps`)
        .map((response: Response) => {
          return response.json().map(
            app => this.parseApiApp(app)
          );
        })
  }

  getCategoriesWithApps() {
    return Observable.forkJoin([
      this.getCategories(),
      this.getApps()
    ]).map(res => {
      return this.mergeAppsWithCategories(res[0], res[1]);
    })
  }

  mergeAppsWithCategories(categories: Category[], apps: App[]): Category[]{
    return categories.map(category => {
      return Object.assign(category, {apps: apps.filter((app) => app.catId === category.id)});
    });
  }

  parseApiCategory(apiCategory): Category {
    return {
      id: apiCategory.Id,
      catname: apiCategory.CatName,
      apps: [],
      ordinal: apiCategory.Ordinal,
    } as Category;
  }

  parseApiApp(apiApp): App {
    return {
      id: apiApp.AppId,
      catId: apiApp.CategoryId,
      appName: apiApp.AppName,
      tags: apiApp.Tags,
      logoName: apiApp.AppLogoName,
    }
  }

  getReorderedCategories(categories, topIndex){
    const selectedCategory = categories.filter(category => category.id === topIndex)[0]
    const index = categories.indexOf(selectedCategory);
    return [
      categories[index],
      ...categories.slice(0,index),
      ...categories.slice(index+1, categories.length)
    ];
  }
}
