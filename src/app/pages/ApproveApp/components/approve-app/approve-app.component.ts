import { Component, OnInit,Input } from '@angular/core';

import { AppService } from '../../../../services/app.service';
import  { App } from './../../../../shared/models/app.model';


@Component({
    selector: 'approve-app',
    providers: [AppService],
    templateUrl: './approve-app.template.html',
})

export class ApproveAppComponent implements OnInit {
    apps:App;

    constructor(private appService: AppService){

    }
    ngOnInit(){
        this.appService.getAllApps()
                        .subscribe(
                            apps=>  this.apps = apps
                        )

    }

}