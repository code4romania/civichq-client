import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppProfileService } from '../../services/app-profile.service';
import { AppService } from './../../../../services/app.service';

import './app-profile.scss';

@Component({
    selector: 'profile',
    providers: [AppProfileService,AppService],
    templateUrl: './app-profile.template.html',
})

export class AppProfileComponent implements OnInit {
    errorMessage:string;
    app:AppProfile;

    constructor(private appProfileService: AppProfileService, private appService: AppService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                let id = +params['id'];
                this.appService.getApp(id)
                    .subscribe(app => this.app = app);
            }
            else {
                this.appProfileService.getAppProfile()
                    .subscribe(
                        app => {this.app = app;},
                        error =>  this.errorMessage = <any>error
                    );
            }

        });
    }

}