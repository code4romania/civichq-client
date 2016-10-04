import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    canActivate() {
        return this.auth.isLoggedIn();
    }
}