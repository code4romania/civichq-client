import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService  } from './../../../../services/auth.service';
import { Router } from '@angular/router';

import './login.scss';


@Component({
    selector: 'login',
    templateUrl: './login.template.html',
})

export class LoginComponent implements OnInit {
    private submitted:boolean = false;
    errors: string
    private user = {
        username: '',
        password: ''
    };
    constructor(private auth: AuthService, private router: Router){
    };

    ngOnInit(){

    }
    login(form){
        this.submitted = true;
        if(form.valid){
            this.auth.login(form.value.username, form.value.password)
                .subscribe(res => {
                    console.log('res',res)
                    if(res.success){
                        this.router.navigate(['/approve-app'])
                    }
                    else {
                        this.errors = res.message;
                    }
                })
        }
    }

}