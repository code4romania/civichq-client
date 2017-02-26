import { AppProfile } from './../../../../shared/models/app-profile.model';
import { Router } from '@angular/router';
import { Component, OnInit,Input } from '@angular/core';

import { AppService } from '../../../../services/app.service';
import { AddAppModel } from '../../../AddAppPage/services/add-app.model';

import './approve-apps.scss'

@Component({
    selector: 'approve-app',
    providers: [AppService],
    templateUrl: './approve-app.template.html',
})

export class ApproveAppComponent implements OnInit {
    apps:AppProfile[];
    selectedApp: AddAppModel;

    constructor(private appService:AppService, private router:Router) {

    }

    ngOnInit() {
        this.appService.getAppsFullDetails()
            .subscribe(
                apps =>  this.apps = apps
            )

    }

    updateApp(app) {
        this.appService.approveApp(app.appdetail.id)
            .subscribe(success => console.log('success?', success))
    }

    editApp(app: AppProfile){
        this.selectedApp = new AddAppModel();

        var simpleCreationDate : Date;
        simpleCreationDate = new Date();
        //simpleCreationDate = new Date(app.appdetail.creationdate.toISOString().slice(0,10));
       var zi =  (app.appdetail.creationdate as Date).getDate();
       console.log("ziua este " + zi);
       //console.log("ceva este " + app.appdetail.creationdate.getVarDate());

        this.selectedApp.appcategoryid = app.appdetail.categoryid;
        this.selectedApp.appcreationdate =  simpleCreationDate; //app.appdetail.creationdate;
        this.selectedApp.appdescription = app.appdetail.description;
        this.selectedApp.appfacebook = app.appdetail.facebook;
        this.selectedApp.appgithub = app.appdetail.github;
        //this.selectedApp.apphashtags = app.appdetail.hashtags.join('');
        this.selectedApp.appid = app.appdetail.id;
        this.selectedApp.applogoname = app.appdetail.logoname;
        this.selectedApp.appname = app.appdetail.name;
        this.selectedApp.appwebsite = app.appdetail.website;

        this.selectedApp.ngodescription = app.ngodetail.description;
        this.selectedApp.ngoemail = app.ngodetail.email;
        this.selectedApp.ngofacebook = app.ngodetail.facebook;
        this.selectedApp.ngogoogleplus = app.ngodetail.googleplus;
        this.selectedApp.ngoinstagram = app.ngodetail.instagram;
        this.selectedApp.ngolinkedin = app.ngodetail.linkedin;
        this.selectedApp.ngologoname = app.ngodetail.logoname;
        this.selectedApp.ngoname = app.ngodetail.name;
        this.selectedApp.ngophone = app.ngodetail.phone;
        this.selectedApp.ngotwitter = app.ngodetail.twitter;
        
    }

}