import {Component,OnInit,DoCheck,AfterViewChecked } from '@angular/core';

import { AuthService } from './../../services/auth.service';


import './header.component.scss';
@Component({
    selector: 'header-component',
    providers:[AuthService],
    templateUrl: './header.template.html'
})


export class HeaderComponent implements OnInit{
    isLoggedIn:boolean;
    constructor(private authService: AuthService){

    }
    ngOnInit(){
        this.isLoggedIn = this.authService.isLoggedIn();
        console.log('isLoggedIn',this.isLoggedIn)
    }

    logout(){
        this.authService.logout();
    }
}