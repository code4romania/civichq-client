import { AppProfile } from './../shared/models/app-profile.model';
import { AuthService } from './auth.service';
import { AuthResponse } from './../shared/models/auth-response.model';
import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { BaseService } from "./base.service";

import { App } from './../shared/models/app.model';


@Injectable()
export class AppService extends BaseService {
    
    private token:string;

    constructor(private http: Http, private auth: AuthService) {
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

    getAppsFullDetails(): Observable<AppProfile[]> {
        return this.http.get(this.rootAddress + 'apps')
            .map((response: Response) => {
                return (response.json() as AppProfile[]).map(app => this.updateStringToBoolean(app));
            });
    }

    updateStringToBoolean(app: AppProfile): AppProfile{
        app.appdetail.isapprovedbool = (app.appdetail.isapproved === 'true');
        return app;
    }

    getApp(id) {
        return this.auth.loginSentinel().flatMap(() => {
            const url = `${this.rootAddress + 'appprofile'}/${id}`;

            return this.http.get(url, { headers: this.auth.headers })
                .map((response: Response) => {
                    return response.json()
                });
        });

    }

    addApp(app){
        return this.auth.loginSentinel().flatMap(() => {
            const url = `${this.rootAddress + 'addapp'}`;
            return this.http.post(url, JSON.stringify(app), { headers: this.auth.headers })
                .map((response: Response) => {
                    return response.json()
                });
        });
    }

    approveApp(appid: number) {
        const urlupd = `${this.rootAddress + 'updateapp'}/${appid}`;

        return this.getToken().map((resp: Response) => {

            if (this.token) {
                this.headers.set(this.authHeaderName, this.token);


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

        return this.auth.loginSentinel().flatMap(() => {
            return this.http.get(url, {headers: this.auth.headers})
                .map((response: Response) => {
                    return response.json().map(
                        app => this.parseAppsFromSearch(app)
                    );
                });
        })
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