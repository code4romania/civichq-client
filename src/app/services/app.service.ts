import { AuthResponse } from './../shared/models/auth-response.model';
import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { BaseService } from "./base.service";

import { App } from './../shared/models/app.model';


@Injectable()
export class AppService extends BaseService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private token:string;

    constructor(private http: Http) {
        super(http);
    }

    getApps() {
        return this.http.get(this.rootAddress + 'apps')
            .map((response: Response) => {
                return response.json().map(
                    app => this.parseApps(app)
                );
            })
    }

    getApp(id) {

        const url = `${this.rootAddress + 'appprofile'}/${id}`;
        return this.http.get(url)
            .map((response: Response) => {
                return response.json()
            })
    }

    addApp(app){
        const url = `${this.rootAddress + 'addapp'}`;
        return this.http.post(url,JSON.stringify(app), {headers: this.headers})
            .map((response: Response) => {
                return response.json()
            })
    }

    update(app: App) {
        const urlupd = `${this.rootAddress + 'updateapp'}/${app.id}`;

        return this.getToken().map((resp: Response) => {

            if (this.token) {
                this.headers.append('x-access-token', this.token);
                //console.log(`Token (update) este ${this.token}`);

                //console.log('url update este ' + urlupd);
                //console.log(this.headers);

                return this.http.put(urlupd, '', { headers: this.headers })
                    .toPromise()
                    .then(r => r.json())
                    .catch(err => JSON.stringify({success: false}));
            }

        });
    }

    searchBy(src:string):Observable<any> {
        const url = `${this.rootAddress + 'search'}/${src}`;
        if (!src) {
            return;
        }
        return this.http.get(url)
            .map((response:Response) => {
                return response.json().map(
                    app =>this.parseAppsFromSearch(app)
                );
            });

    }

    getToken():Observable<any> {
        const url = `${this.rootAddress + 'auth'}`;


        //console.log('Form stringify este ' + JSON.stringify({ username: 'code4', password: 'civitas123#' }));

        return this.http.post(url,
            JSON.stringify({username: 'code4', password: 'civitas123#'}),
            {headers: this.headers})
            .map((response:Response) => {
                let r = response.json() as AuthResponse;
                //console.log('r este ' + JSON.stringify(r));
                if (r) {
                    this.token = r.token;
                    //console.log(`Token (getToken) este ${this.token}`);
                }
            });
    }

    parseApps(apiApp):App {
        return {
            id: apiApp.appdetail.id,
            appName: apiApp.appdetail.name,
            tags: apiApp.appdetail.hashtags,
            logoName: apiApp.appdetail.logoname,
            isApproved: apiApp.appdetail.isapproved === 'true'
        }
    }

    parseAppsFromSearch(apiApp):App {
        return {
            id: apiApp.AppId,
            appName: apiApp.AppName,
            tags: apiApp.Tags,
            logoName: apiApp.AppLogoName,
            isApproved: true
        }
    }

}