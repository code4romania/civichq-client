import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from './../../../../services/app.service';
import { App } from './../../../../shared/models/app.model';

import './terms.component.scss';

@Component({
    selector: 'terms',
    templateUrl: './terms.component.html'
})

export class TermsComponent implements OnInit {
    apps: App;
    constructor(private route: ActivatedRoute, private appService: AppService, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe((data) => {
        })
    }
    goToApp(app) {
        let appName = app.appName = app.appName.replace(/\s+/g, '');
        let link = ['/apps', app.id, appName];
        this.router.navigate(link);

    }

}