import { Injectable } from '@angular/core';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";

@Injectable()
export  class TagsService extends BaseService {
    constructor(private http:Http) {
        super(http);
    }

    getTags(searchTerm){
        const url = `${this.rootAddress + 'tags'}/${searchTerm}`;
        return this.http.get(url)
                    .map((response:Response)=>{
                        return response.json();
                    })
    }
}