import { AppProfile } from './../../../../shared/models/app-profile.model';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AppService } from '../../../../services/app.service';
import { AddAppModel } from '../../../AddAppPage/services/add-app.model';
import {scrollToElementRef} from '../../../../util/scroll.util';

@Component({
    selector: 'approve-app',
    providers: [AppService],
    templateUrl: './approve-app.template.html',
    styleUrls: ['./approve-apps.scss']
})

export class ApproveAppComponent implements OnInit {
    apps:AppProfile[];
    selectedApp: AddAppModel;
    showSpinner: Boolean = true;

    @ViewChild('addAppComponent', {read: ElementRef})
    addAppComponentRef: ElementRef;

    constructor(private appService:AppService, private router:Router) {

    }

    async ngOnInit() {
        this.apps = await this.appService.getAppsFullDetails();
        this.showSpinner = false;
    }

    updateApp(app) {
        this.appService.approveApp(app.appdetail.id)
            .then(success => console.log('success?', success));
    }

    editApp(app: AppProfile){
        this.selectedApp = new AddAppModel();

        this.selectedApp.appcategoryid = app.appdetail.categoryid;
        this.selectedApp.appcreationdate =  this.getDateAsString(app.appdetail.creationdate);
        this.selectedApp.appdescription = app.appdetail.description;
        this.selectedApp.appfacebook = app.appdetail.facebook;
        this.selectedApp.appgithub = app.appdetail.github;
        this.selectedApp.apphashtags = (app.appdetail.hashtags) ? app.appdetail.hashtags.toString() : '';
        this.selectedApp.apptechnologies = (app.appdetail.technologies) ? app.appdetail.technologies.toString() : '';
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
        this.selectedApp.ngoid = app.ngodetail.id;
        scrollToElementRef(this.addAppComponentRef);
    }

    private getDateAsString(theDateAsString): string{
        var simpleCreationDate = new Date(theDateAsString);
        var dateAsString = simpleCreationDate.getFullYear() + '-' + this.getMonthNoAsString(simpleCreationDate) + '-' + this.getDayNoAsString(simpleCreationDate);
        return dateAsString;
    }

    private getMonthNoAsString(date: Date) : string {
        var mnt = date.getMonth() + 1;
        var str = mnt < 10 ? '0'+mnt : ''+mnt;
        return str;
    }

    private getDayNoAsString(date: Date): string{
        var dayNo = date.getDate();
        var str = dayNo < 10 ? '0'+dayNo : ''+dayNo;
        return str;
    }

    stopClickPropagation($event: MouseEvent) {
        event.stopPropagation();
    }
}
