import { CivicFile } from './../../../../shared/models/civic-file.model';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit, Input } from '@angular/core';
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
    providers: [AppService, TagsService, CategoriesService, UploadService],
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit {
    @Input() app: AddAppModel;
    public categories: Array<string>;
    public tags: Array<string> = [];
    private value: any = {};
    private selectedAppTags: Array<string> = [];
    private newTag: string;
    private appLogo: CivicFile;
    private ngoLogo: CivicFile;
    private isAppLogoUploaded: boolean;
    private isNgoLogoUploaded: boolean;

    constructor(private appService: AppService, private tagsService: TagsService, private categoriesService: CategoriesService, private uploadService: UploadService) {
    }

    ngOnInit() {
        this.app = new AddAppModel();

        this.categoriesService.getCategories()
            .subscribe(cats => {
                this.categories = cats.map((category) => {
                    return { id: category.id, text: category.catname }
                });
            })

    }

    public selectTags(value: any): void {
        this.newTag = '';
        this.selectedAppTags.push(value.text)
    }

    public selectCat(value: any): void {
        this.app.appcategoryid = value.id
    }

    public refreshValue(value: any): void {
        this.value = value;
    }

    public removeTags(value: any): void {
        this.selectedAppTags.splice(this.selectedAppTags.indexOf(value.text), 1);
    }

    public loadTags(value: any): void {
        value.charAt(0) == '#' ? this.newTag = value : this.newTag = '#' + value;
        let searchTerm = value.replace('#', '');
        if (searchTerm && searchTerm.length) {
            this.tagsService.getTags(searchTerm)
                .subscribe(tags => {
                    this.tags = tags.map(function (item) {
                        return { text: item['Tag'] }
                    });
                })
        }


    }

    addApp() {
        this.selectedAppTags.length ? this.app.apphashtags = this.selectedAppTags.toString() + this.newTag
            : this.app.apphashtags = this.newTag;

        if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {
            this.appService.addApp(this.app)
                .subscribe(response => console.log('response', response))
        }
    }

    appLogoChangeEvent(fileInput: any) {

        var theLogo = fileInput.target.files[0];
        this.app.applogoname = this.getNewLogoName(theLogo.name);
        this.appLogo = new CivicFile(theLogo, this.app.applogoname);
        

        var isFileAllowed = this.isFileExtensionAllowed(this.appLogo.NewFileName);
        console.log('app logo name ' + this.app.applogoname);

        if (isFileAllowed) {
            this.uploadService.uploadLogo(this.appLogo).then(r => {
                console.log('Dupa upload, response este');
                console.log(r);
                this.isAppLogoUploaded = (r == '200');
            });
        }
        else {
            alert('Fisierul ales trebuie sa fie .jpg sau .png!');
            this.app.applogoname = '';
            this.appLogo = null;
        }

        //console.log(fileInput);

    }

    ngoLogoChangeEvent(fileInput: any) {

        var theLogo = fileInput.target.files[0];
        this.app.ngologoname = this.getNewLogoName(theLogo.name);
        this.ngoLogo = new CivicFile(theLogo, this.app.ngologoname);
        

        var isFileAllowed = this.isFileExtensionAllowed(this.ngoLogo.NewFileName);
        console.log('ngo logo name ' + this.app.ngologoname);

        if (isFileAllowed) {
            this.uploadService.uploadLogo(this.ngoLogo).then(r => {
                console.log('Dupa ngo upload, response este');
                console.log(r);
                this.isNgoLogoUploaded = (r == '200');
            });
        }
        else {
            alert('Fisierul ales trebuie sa fie .jpg sau .png!');
            this.app.ngologoname = '';
            this.ngoLogo = null;
        }

        //console.log(fileInput);

    }

    private isFileExtensionAllowed(filename: string) {
        var ext = filename.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'png':
                return true;
            default:
                return false;
        }
    }

    private getNewLogoName(originalName: string): string{
        var prefix = this.randomstring(8);
        var newName = prefix + originalName;
        return newName;
    }

    private randomstring(L) {
        var s = '';
        while (s.length < L) s += this.getRandomChar();
        return s;
    }

    private getRandomChar(): string {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n.toString(); //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }


}