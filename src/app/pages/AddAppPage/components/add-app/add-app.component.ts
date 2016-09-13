import { Component, OnInit,Input } from '@angular/core';
import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppDetails } from './../../../../shared/models/app-details.model';
import { NgoDetails } from './../../../../shared/models/ngo-details.model';

import './add-app.scss';


@Component({
    selector: 'add-app',
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit {
    @Input() app: AppProfile;

    ngOnInit() {
        this.app = new AppProfile();
        this.app.appdetail = new AppDetails();
        this.app.ngodetail = new NgoDetails();
    }

}