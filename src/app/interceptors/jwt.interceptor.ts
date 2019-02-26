import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {from, Observable} from "rxjs";
import {mergeMap, switchMap} from "rxjs/operators";
import {AuthResponse} from "../shared/models/auth-response.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private loggingSentinel: Observable<AuthResponse>;

  constructor(private auth: AuthService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isUserTokenValid()) {
      return next.handle(this.setHeaders(request, this.auth.userToken));
    } else if (this.auth.isSentinelTokenValid()) {
      return next.handle(this.setHeaders(request, this.auth.sentinelToken));
    } else if (request.url.indexOf("/auth") === -1) {
      this.loggingSentinel = this.loggingSentinel || from(this.auth.loginSentinel());
      return (this.loggingSentinel).pipe(switchMap(token => {
        delete this.loggingSentinel;
        return next.handle(this.setHeaders(request, this.auth.sentinelToken));
      }));
    } else {
      return next.handle(request);
    }
  }

  private setHeaders(request: HttpRequest<any>, token: String) {
    let header: any = {setHeaders: {}};
    header.setHeaders[this.auth.authHeaderName] = token;
    request = request.clone(header);
    return request;
  }
}
