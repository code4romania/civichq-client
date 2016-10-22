import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Subscription }   from 'rxjs/Subscription';

import './header.component.scss';

@Component({
    selector: 'header-component',
    templateUrl: './header.template.html'
})

export class HeaderComponent{
    isLoggedIn:boolean = this.authService.isLoggedIn();
    subscription: Subscription;
    public isCollapsed: boolean = true;

    constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute){
        this.subscription = authService.isLoggedIn$.subscribe((data)=>{
            this.isLoggedIn = data;
        })
    }

    search(query){
        if (query.trim()){
            this.router.navigate(['/search',{filter: query.trim()}]);
        }

    }
    logout(){
        this.authService.logout();
    }
}