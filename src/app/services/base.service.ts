import { Observable } from 'rxjs';
import {HttpClient}   from "@angular/common/http";
import { environment } from '../../environments/environment';
/**
 export * BaseService
 */
export class BaseService {
    rootAddress: string;

    userToken: string;
    sentinelToken: string;
    readonly authHeaderName = 'x-access-token';

    constructor(private _http: HttpClient) {
      this.rootAddress = environment.apiURL;
    }

    static handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
