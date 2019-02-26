import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TagsService extends BaseService {
    constructor(private http: HttpClient, private auth: AuthService) {
        super(http);
    }

    async getTags(searchTerm: string) {
        const url = `${this.rootAddress + 'tags'}/${searchTerm}`;
        return await this.http.get<Array<any>>(url).toPromise();
    }
}
