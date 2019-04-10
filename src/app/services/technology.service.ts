import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TechnologiesService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public getTechnologies(): Promise<Array<String>> {
        return this.http.get<Array<String>>(`${this.rootAddress}technologies`).toPromise();
    }
}
