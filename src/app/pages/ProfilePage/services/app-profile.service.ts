import {AuthService} from '../../../services/auth.service';
import {Injectable} from '@angular/core';

import {AppProfile} from '../../../shared/models/app-profile.model';
import {BaseService} from "../../../services/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppProfileService extends BaseService {
    constructor(private http: HttpClient, private auth: AuthService) {
        super(http);
    }

    async getAppProfile() {
        return await this.http.get<AppProfile>(this.rootAddress + 'masterprofile').toPromise();
    }

}
