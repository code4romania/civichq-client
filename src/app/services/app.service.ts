import { AuthResponse } from './../shared/models/auth-response.model';
import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

import { App } from './../shared/models/app.model';


@Injectable()
export class AppService extends BaseService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    //private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private token: string;

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

    update(app: App) {
        const urlupd = `${this.rootAddress + 'updateapp'}/${app.id}`;

        //console.log('Getting token...');
        //console.log('app id este ' + app.id);

        return this.getToken().map((resp: Response) => {

            if (this.token) {
                this.headers.append('x-access-token', this.token);
                console.log(`Token (update) este ${this.token}`);

                console.log('url update este ' + urlupd );
                
                this.http.put(urlupd, '', { headers: this.headers })
                    .map((resps: Response) => {
                        console.log(resps);
                    })
            }

        });
    }

    getToken(): Observable<any> {
        const url = `${this.rootAddress + 'auth'}`;

              
        //console.log('Form stringify este ' + JSON.stringify({ username: 'code4', password: 'civitas123#' }));

        return this.http.post(url,
            JSON.stringify({ username: 'code4', password: 'civitas123#' }),
            { headers: this.headers })
            .map((response: Response) => {
                let r = response.json() as AuthResponse;
                //console.log('r este ' + JSON.stringify(r));
                if (r) {
                    this.token = r.token;
                    //console.log(`Token (getToken) este ${this.token}`);
                }
            });
    }

    parseApps(apiApp): App {
        return {
            id: apiApp.appdetail.id,
            appName: apiApp.appdetail.name,
            tags: apiApp.appdetail.hashtags,
            logoName: apiApp.appdetail.logoname,
            isApproved: apiApp.appdetail.isapproved === 'true'
        }
    }

}