import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

import { App } from './../shared/models/app.model';


@Injectable()
export class AppService extends BaseService {
    constructor(private http:Http) {
        super(http);
    }

    getApprovedApps() {
        return this.http.get(this.rootAddress + '/approvedapps')
            .map((response:Response) => {
                return response.json().map(
                    app => this.parseApiApprovedApp(app)
                );
            })
    }

    getUnapprovedApps(){
        return this.http.get(this.rootAddress + '/appstoapprove')
            .map((response:Response) => {
                return response.json().map(
                    app => this.parseApiUnapprovedApp(app)
                );
            })

    }
    getAllApps(){
        return Observable.forkJoin([
            this.getApprovedApps(),
            this.getUnapprovedApps()
        ]).map(res => {
            return res[0].concat(res[1]);
        })
    }

    parseApiApprovedApp(apiApp): App {
        return {
            id: apiApp.AppId,
            appName: apiApp.AppName,
            tags: apiApp.Tags,
            logoName: apiApp.AppLogoName,
            isApproved: true
        }
    }
    parseApiUnapprovedApp(apiApp): App {
        return {
            id: apiApp.appdetail.id,
            appName: apiApp.appdetail.name,
            tags: apiApp.appdetail.hashtags,
            logoName: apiApp.appdetail.logoname,
            isApproved: apiApp.appdetail.isapproved
        }
    }

}