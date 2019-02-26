import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './category.model';
import {App} from './app.model';
import {BaseService} from "./base.service";

@Injectable()
export class CategoriesService extends BaseService {
  
    constructor(private http: HttpClient) {
      super(http);
    }

    async getCategories() {
        let categories: any[] = await this.http.get<any>(`${this.rootAddress}categories`).toPromise();
        return categories.map(
            (category: any) => CategoriesService.parseApiCategory(category)
        );
    }

    async getApps() {
        let apps: any[] = await this.http.get<any>(`${this.rootAddress}approvedapps`).toPromise();
        return apps.map(
            app => CategoriesService.parseApiApp(app)
        );

    }

    getCategoriesWithApps() {
        return Promise.all(
            [this.getCategories(),
                this.getApps()]).then(res => {
            return this.mergeAppsWithCategories(res[0], res[1]);
        })
    }

    mergeAppsWithCategories(categories: Category[], apps: App[]): Category[] {
        return categories.map(category => {
            return Object.assign(category, {apps: apps.filter((app) => app.catId === category.id)});
        });
    }

    static parseApiCategory(apiCategory): Category {
        return {
            id: apiCategory.Id,
            catname: apiCategory.CatName,
            apps: [],
            ordinal: apiCategory.Ordinal,
        } as Category;
    }

    static parseApiApp(apiApp): App {
        return {
            id: apiApp.AppId,
            catId: apiApp.CategoryId,
            appName: apiApp.AppName,
            tags: apiApp.Tags,
            logoName: apiApp.AppLogoName,
            ngoLogoName: apiApp.NgoLogoName
        }
    }

    getReorderedCategories(categories, topIndex) {
        const selectedCategory = categories.filter(category => category.id === topIndex)[0];
        const index = categories.indexOf(selectedCategory);
        return [
            categories[index],
            ...categories.slice(0, index),
            ...categories.slice(index + 1, categories.length)
        ];
    }
}
