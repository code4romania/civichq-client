import { Injectable }  from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import  {AppProfile } from '../components/app-profile/app-profile.model';
import {BaseService} from "../../../services/base.service";

@Injectable()
export class AppProfileService extends BaseService{
    constructor (private http: Http) {
        super(http);
    }

    getAppProfile():Observable<AppProfile> {

        return this.http.get(this.rootAddress + 'masterprofile')
            .map(this.extractData)
            .catch(this.handleError);


    }

    private extractData(res:Response) {
        let app: AppProfile;
        app = res.json();
        return app;
    }


}