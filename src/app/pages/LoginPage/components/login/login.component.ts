import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.scss']
})

export class LoginComponent implements OnInit {
    private submitted: boolean = false;
    errors: string;
    public showSpinner = false;
    private user = {
        username: '',
        password: ''
    };

    constructor(private auth: AuthService, private router: Router) {
    };

    ngOnInit() {

    }

    async login(form) {
        this.submitted = true;
        if (form.valid) {
            let res = await this.auth.login(form.value.username, form.value.password);
            this.showSpinner = false;
            if (res.success) {
                this.router.navigate(['/approve-app'])
            } else {
                this.errors = res.message;
            }

        }
    }

}
