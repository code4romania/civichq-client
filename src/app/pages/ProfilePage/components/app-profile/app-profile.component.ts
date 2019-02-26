import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppProfile } from '../../../../shared/models/app-profile.model';
import { AppProfileService } from '../../services/app-profile.service';
import { AppService } from '../../../../services/app.service';


@Component({
    selector: 'profile',
    providers: [AppProfileService,AppService],
    templateUrl: './app-profile.template.html',
    styleUrls: ['./app-profile.component.scss']
})

export class AppProfileComponent implements OnInit {
    errorMessage:string;
    app:AppProfile;
    showSpinner:Boolean = true;

    constructor(private appProfileService: AppProfileService, private appService: AppService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach(async (params: Params) => {
            if (params['id']) {
                let id = +params['id'];
                this.app = await this.appService.getApp(id);
                this.showSpinner = false;
            } else {
                this.app = await this.appProfileService.getAppProfile();
                this.showSpinner = false;
            }

        });
    }
}
