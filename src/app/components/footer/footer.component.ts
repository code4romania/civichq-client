import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Subscription }   from 'rxjs/Subscription';

import './footer.component.scss';

@Component({
    selector: 'footer-component',
    templateUrl: './footer.template.html'
})

export class FooterComponent {
    isLoggedIn:boolean = this.authService.isLoggedIn();
    subscription: Subscription;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
        this.subscription = authService.isLoggedIn$.subscribe((data)=>{
            this.isLoggedIn = data;
        })
    }

    logout(){
        this.authService.logout();
    }
}