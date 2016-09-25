import { Component, OnInit,Input } from '@angular/core';
import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppDetails } from './../../../../shared/models/app-details.model';
import { NgoDetails } from './../../../../shared/models/ngo-details.model';

import { AppService } from './../../../../services/app.service';
import { TagsService } from './../../../../services/tags.service';
import { AddAppModel } from './../../services/add-app.model';

import './add-app.scss';


@Component({
    selector: 'add-app',
    providers: [AppService, TagsService],
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit {
    @Input() app:AddAppModel;
    public tags:Array<string> = [];
    private value:any = {};
    private selectedAppTags:Array<string> = [];
    newTag:string;

    constructor(private appService:AppService, private tagsService:TagsService) {

    }

    ngOnInit() {
        this.app = new AddAppModel();
    }

    public selectTags(value:any):void {
        this.newTag = ''
        this.selectedAppTags.push(value.text)
    }

    public refreshValue(value:any):void {
        this.value = value;
    }

    public removeTags(value:any):void {
        this.selectedAppTags.splice(this.selectedAppTags.indexOf(value.text), 1);
    }

    public loadTags(value:any):void {
        value.charAt(0) == '#' ? this.newTag = value : this.newTag = '#' + value;
        let searchTerm = value.replace('#', '');
        if (searchTerm && searchTerm.length) {
            this.tagsService.getTags(searchTerm)
                .subscribe(tags => {
                    this.tags = tags.map(function (item) {
                        return item['Tag']
                    });
                })
        }


    }

    addApp() {
        this.selectedAppTags.length ? this.app.apphashtags = this.selectedAppTags.toString() + this.newTag
            : this.app.apphashtags = this.newTag;
        console.log('add app:', this.app)
        this.appService.addApp(this.app)
            .subscribe(response => console.log('response', response))
    }
}