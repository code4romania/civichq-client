import { CivicFile } from './../../../../shared/models/civic-file.model';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit, Input } from '@angular/core';
import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppDetails } from './../../../../shared/models/app-details.model';
import { NgoDetails } from './../../../../shared/models/ngo-details.model';
import { CivicFileValidationResult } from './../../../../shared/models/file-validation-result.model';

import { AppService } from './../../../../services/app.service';
import { CategoriesService } from './../../../../services/category.service';
import { TagsService } from './../../../../services/tags.service';
import { AddAppModel } from './../../services/add-app.model';

import './add-app.component.scss';


@Component({
    selector: 'add-app',
    providers: [AppService, TagsService, CategoriesService, UploadService],
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit {


    constructor(private appService: AppService, private tagsService: TagsService, private categoriesService: CategoriesService, private uploadService: UploadService) {

        this.submitted = false;
        this.isAddingNewApp = true;
    }


    @Input() app: AddAppModel;
    @Input() isAddingNewApp: boolean
    public categories: Array<Object> = [{ id: null, text: 'Alege o categorie' }];
    public tags: Array<string> = [];
    private value: any = {};
    private selectedAppTags: Array<string> = [];
    private newTag: string;
    private submitted: boolean;
    private message;
    private error;
    private appLogo: CivicFile;
    private ngoLogo: CivicFile;
    private isAppLogoUploaded: boolean;
    private isAppLogoValid: boolean;
    private isNgoLogoUploaded: boolean;
    private isNgoLogoValid: boolean;
    public phoneRegex = '\\+4\\d{10}';

    ngOnInit() {

        this.app = new AddAppModel();
        this.setDefaultsForLogoRelated();
        this.app.appcategoryid = null;

        this.categoriesService.getCategories()
            .subscribe(cats => {
                this.categories = this.categories.concat(cats.map((category) => {
                    return { id: category.id, text: category.catname }
                }))

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



    appLogoChangeEvent(fileInput: any) {
        this.isAppLogoValid = true;
        var theLogo = fileInput.target.files[0];
        this.app.applogoname = this.uploadService.GetNewLogoName(theLogo.name);
        this.appLogo = new CivicFile(theLogo, this.app.applogoname);


        var isFileAllowed = this.uploadService.IsFileAllowed(this.appLogo);
        //console.log('app logo name ' + this.app.applogoname);

        if (!isFileAllowed.IsValid) {
            this.error = isFileAllowed.ErrorMessage;
            this.isAppLogoValid = false;
            this.app.applogoname = '';
            this.appLogo = null;
            //console.log(this.error);
        }

        //console.log(fileInput);

    }



    ngoLogoChangeEvent(fileInput: any) {
        this.isNgoLogoValid = true;
        var theLogo = fileInput.target.files[0];
        this.app.ngologoname = this.uploadService.GetNewLogoName(theLogo.name);
        this.ngoLogo = new CivicFile(theLogo, this.app.ngologoname);


        var isFileAllowed = this.uploadService.IsFileAllowed(this.ngoLogo);

        //console.log('ngo logo name ' + this.app.ngologoname);

        if (!isFileAllowed.IsValid) {
            this.error = isFileAllowed.ErrorMessage;
            this.isNgoLogoValid = false;
            this.app.ngologoname = '';
            this.ngoLogo = null;
            //console.log(this.error);
        }

        //console.log(fileInput);

    }

    private uploadLogo(theLogo: CivicFile, isUploadingAppLogo: boolean): Promise<any> {
        return this.uploadService.uploadLogo(theLogo).then(r => {
            //console.log('Dupa upload, response este');
            //console.log(r);
            if (isUploadingAppLogo) {
                this.isAppLogoUploaded = (r == '200');
            } else {
                this.isNgoLogoUploaded = (r == '200');
            }

        }).catch((err) => {
            if (isUploadingAppLogo) {
                this.isAppLogoUploaded = false;
            } else {
                this.isNgoLogoUploaded = false;
            }
            this.error = err.toString();
        });
    }

    addApp(form) {
        console.log('form', form)
        this.submitted = true;

        if (this.isAppLogoValid && this.isNgoLogoValid) {
            var l1 = this.uploadLogo(this.appLogo, true);

            var l2 = new Promise((resolve, reject) => {
                this.isNgoLogoUploaded = true;
                resolve('')
            });
            if (this.isNgoLogoValid && this.ngoLogo) {
                l2 = this.uploadLogo(this.ngoLogo, false);
            }

            Promise.all([l1, l2]).then(() => {
                if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {

                    if (form.valid) {
                        this.selectedAppTags.length ? this.app.apphashtags = this.selectedAppTags.toString() + this.newTag
                            : this.app.apphashtags = this.newTag;

                        this.appService.addApp(this.app)
                            .subscribe(response => {
                                this.message = response.result;
                                if (this.message === 'success') {
                                    this.error = null;
                                    this.setDefaultsForLogoRelated();
                                }
                                else {
                                    let errorRegex = /\(ERROR\)\:(.*)/;
                                    this.error = errorRegex.exec(response.result)[1];
                                }

                            })
                    }
                }

            });
        }
        else {
            this.error = 'Logo-ul aplicației sau al organizației este invalid, poate sa fie doar .png sau .jpg, maxim 500px x 500px.';
        }


    }

    private setDefaultsForLogoRelated() {
        this.ngoLogo = null;
        this.appLogo = null;
        this.isAppLogoUploaded = false;
        this.isAppLogoValid = false;
        this.isNgoLogoUploaded = false;
        this.isNgoLogoValid = true; //da, true
    }




}