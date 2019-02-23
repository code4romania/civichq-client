import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
//import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Category } from './category.model';
import { App } from './app.model';

declare var SERVER_ADDRESS: string;

@Injectable()
export class TechnologiesService {

  apiUrl = SERVER_ADDRESS;//'http://localhost:8080/api';
  constructor(private http: Http, private auth: AuthService) {
    
   }

  getTechnologies() {
    
    return this.auth.loginSentinel().flatMap(() => {
      
      return this.http.get(`${this.apiUrl}technologies`,{headers: this.auth.headers})
        .map((response: Response) => {
            return response.json()
        })
    });
  }
}
