import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription }   from 'rxjs';



@Component({
    selector: 'footer-component',
    templateUrl: './footer.template.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    isLoggedIn:boolean = this.authService.isLoggedIn();
    subscription: Subscription;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
    }

    logout(){
        this.authService.logout();
    }
}
