import {AuthResponse} from '../shared/models/auth-response.model';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthService extends BaseService {
  private loggedIn: boolean = false;
  private token: string;
  private jwtHelperService: JwtHelperService;

  public static getLoginPath(): string {
    return 'auth/'
  }
  constructor(private http: HttpClient, private router: Router, ) {
    super(http);
    this.loggedIn = false;
    this.jwtHelperService = new JwtHelperService();
  }

  async login(username: String, password: String) {
    const url = `${this.rootAddress + AuthService.getLoginPath()}`;
    let authResponse: AuthResponse = await this.http.post<AuthResponse>(url, {
      username: username,
      password: password
    }).toPromise();
    if (authResponse.success) {
      this.token = authResponse.token;
      this.userToken = this.token;
      this.loggedIn = true;
    }
    return authResponse;
  }

  logout() {
    delete this.userToken;
    this.router.navigate(['/login']);
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }


  async loginSentinel() {
    const url = `${this.rootAddress + AuthService.getLoginPath()}`;
    let authResponse: AuthResponse = await this.http.post<AuthResponse>(url, {
      username: 'sentinel',
      password: '!!abracadabra@#',
      issentinel: 'true'
    }).toPromise();
    if (authResponse.success) {
      this.sentinelToken = authResponse.token;
    }
    return authResponse;
  }

  public isSentinelTokenValid(): boolean {
    return (this.sentinelToken !== undefined && !this.jwtHelperService.isTokenExpired(this.sentinelToken));
  }

  public isUserTokenValid() {
    return (this.userToken !== undefined && !this.jwtHelperService.isTokenExpired(this.userToken));
  }
}
