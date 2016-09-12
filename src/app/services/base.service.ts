import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

/**
 export * BaseService
 */
export class BaseService {
    rootAddress: string = "http://localhost:3000/api/";

    constructor(private _http: Http) {

    }

    handleError(error:any) {

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}