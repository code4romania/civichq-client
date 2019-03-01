import {AppProfile} from '../shared/models/app-profile.model';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {App} from '../shared/models/app.model';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppService extends BaseService {

    private token: string;

    constructor(private http: HttpClient, private auth: AuthService) {
        super(http);
    }

    async getApps() {
        let apps: any[] = await this.http.get<any>(this.rootAddress + 'apps').toPromise();
        return apps.map(app => AppService.parseApps(app));
    }

    async getAppsFullDetails() {
        let appDetails: AppProfile[] = await this.http.get<AppProfile[]>(this.rootAddress + 'apps').toPromise();
        return appDetails.map(app => AppService.updateStringToBoolean(app));

    }

    static updateStringToBoolean(app: AppProfile): AppProfile {
        app.appdetail.isapprovedbool = (app.appdetail.isapproved === 'true');
        return app;
    }

    async getApp(id) {
        const url = `${this.rootAddress + 'appprofile'}/${id}`;
        return await this.http.get<AppProfile>(url).toPromise();
    }

    async addApp(app) {
        const url = `${this.rootAddress + 'addapp'}`;
        return await this.http.post(url, app).toPromise();
    }

    async editApp(app) {
        const url = `${this.rootAddress + 'editapp'}`;
        return await this.http.put(url, app).toPromise();
    }

    async approveApp(appid: number) {
        const urlupd = `${this.rootAddress + 'updateapp'}/${appid}`;
        return await this.http.put(urlupd, '',).toPromise();
    }

    async searchBy(src: string) {
        const url = `${this.rootAddress + 'search'}/${src}`;
        if (!src) {
            return;
        }
        let appsFromSearch: any = await this.http.get(url).toPromise();
        return appsFromSearch.map(app => AppService.parseAppsFromSearch(app));
    }


    static parseApps(apiApp): App {
        return {
            id: apiApp.appdetail.id,
            appName: apiApp.appdetail.name,
            tags: apiApp.appdetail.hashtags,
            logoName: apiApp.appdetail.logoname,
            isApproved: apiApp.appdetail.isapproved === 'true'
        }
    }

    static parseAppsFromSearch(apiApp): App {
        return {
            id: apiApp.AppId,
            appName: apiApp.AppName,
            tags: apiApp.Tags,
            logoName: apiApp.AppLogoName,
            isApproved: true
        }
    }

}
