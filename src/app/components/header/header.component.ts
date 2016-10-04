import {Component} from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { Subscription }   from 'rxjs/Subscription';


import './header.component.scss';
@Component({
    selector: 'header-component',
    templateUrl: './header.template.html'
})


export class HeaderComponent{
    isLoggedIn:boolean;
    subscription: Subscription;
    constructor(private authService: AuthService){
        this.subscription = authService.isLoggedIn$.subscribe((data)=>{
            this.isLoggedIn = data;
        })
    }


    logout(){
        this.authService.logout();
    }
}