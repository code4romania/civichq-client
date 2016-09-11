import { Component, OnInit} from '@angular/core';
import { AppProfileService } from '../../services/app-profile.service';
import { AppProfile } from './app-profile.model';

import './app-profile.scss';

@Component({
    selector: 'profile',
    providers: [AppProfileService],
    templateUrl: './app-profile.template.html',
})

export class AppProfileComponent implements OnInit {

    errorMessage:string;
    app:AppProfile;

    constructor(private appProfileService: AppProfileService) {
    }

    ngOnInit() {
        this.appProfileService.getAppProfile()
            .subscribe(
                app => this.app = app,
                error =>  this.errorMessage = <any>error
            )
    }

}