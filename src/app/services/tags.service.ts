import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {AppTag} from "../shared/models/app-tag.model";

@Injectable()
export class TagsService extends BaseService {
    constructor(private http: HttpClient, private auth: AuthService) {
        super(http);
    }

    public getTags(searchTerm: String) {
        const url = `${this.rootAddress + 'tags'}/${searchTerm}`;
        return this.http.get<Array<AppTag>>(url);
    }
}
