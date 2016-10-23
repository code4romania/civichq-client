import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

@Injectable()
export  class TagsService extends BaseService {
    constructor(private http:Http, private auth: AuthService) {
        super(http);
    }

    getTags(searchTerm){
        const url = `${this.rootAddress + 'tags'}/${searchTerm}`;
        return this.auth.loginSentinel().flatMap(() => {
            return this.http.get(url, {headers: this.auth.headers})
                .map((response: Response) => {
                    return response.json();
                })
        })

    }
}