import { AuthResponse } from './../shared/models/auth-response.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends BaseService {
    private loggedIn:boolean = false;
    private headers = new Headers({'Content-Type': 'application/json'});
    private token: string;
    private isLoggedInSource = new Subject<boolean>();
    isLoggedIn$ = this.isLoggedInSource.asObservable();
    constructor(private http: Http,private router: Router){
        super(http);
        this.loggedIn = !!localStorage.getItem('auth_token');

    }

    login(username, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = `${this.rootAddress + 'auth'}`;
        return this.http.post(url,
            JSON.stringify({ username: username, password: password }),
            { headers: this.headers })
            .map((response: Response) => {
                let r = response.json() as AuthResponse;
                this.isLoggedInSource.next(r.success);
                if (r.success) {
                    this.token = r.token;
                    localStorage.setItem('auth_token', r.token);
                    this.loggedIn = true;
                }
                return {success: r.success, message: r.message};
            });
    }
    logout() {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
        this.loggedIn = false;
        this.isLoggedInSource.next(this.loggedIn);
    }
    isLoggedIn() {
        return this.loggedIn;
    }
}