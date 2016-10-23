import { AuthService } from './../../../services/auth.service';
import { Injectable }  from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import  {AppProfile } from '../../../shared/models/app-profile.model';
import {BaseService} from "../../../services/base.service";

@Injectable()
export class AppProfileService extends BaseService{
    constructor (private http: Http, private auth: AuthService) {
        super(http);
    }

    getAppProfile():Observable<AppProfile> {
        return this.auth.loginSentinel().flatMap(() => {
            return this.http.get(this.rootAddress + 'masterprofile', {headers: this.auth.headers})
                .map(this.extractData)
                .catch(this.handleError);
        });

    }

    private extractData(res:Response) {
        let app: AppProfile;
        app = res.json();
        return app;
    }


}