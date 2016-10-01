import { Component, OnInit,Input } from '@angular/core';
import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppDetails } from './../../../../shared/models/app-details.model';
import { NgoDetails } from './../../../../shared/models/ngo-details.model';

import { AppService } from './../../../../services/app.service';
import { CategoriesService } from './../../services/category.service';
import { TagsService } from './../../../../services/tags.service';
import { AddAppModel } from './../../services/add-app.model';

import './add-app.scss';


@Component({
    selector: 'add-app',
    providers: [AppService, TagsService, CategoriesService],
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit {
    @Input() app:AddAppModel;
    public categories:Array<Object> = [{id: null, text: 'Alege o categorie'}];
    public tags:Array<string> = [];
    private value:any = {};
    private selectedAppTags:Array<string> = [];
    private newTag:string;
    private submitted:boolean;
    private message;
    private error;


    constructor(private appService:AppService, private tagsService:TagsService, private categoriesService:CategoriesService) {
        this.submitted = false;
    }

    ngOnInit() {
        this.app = new AddAppModel();
        this.app.appcategoryid = null;
        this.categoriesService.getCategories()
            .subscribe(cats => {
                this.categories = this.categories.concat(cats.map((category) => {
                    return {id: category.id, text: category.catname}
                }))
            })

    }

    public selectTags(value:any):void {
        this.newTag = '';
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
                        return {text: item['Tag']}
                    });
                })
        }


    }

    addApp(form) {
        console.log('form', form)
        this.submitted = true;
        if (form.valid) {
            this.selectedAppTags.length ? this.app.apphashtags = this.selectedAppTags.toString() + this.newTag
                : this.app.apphashtags = this.newTag;
            this.appService.addApp(this.app)
                .subscribe(response => {
                    this.message = response.result;
                    if (this.message === 'success') {
                        this.error = null;
                    }
                    else {
                        let errorRegex = /\(ERROR\)\:(.*)/;
                        this.error = errorRegex.exec(response.result)[1];
                    }

                })
        }

    }
}