import { CivicFile } from './../../../../shared/models/civic-file.model';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppProfile } from './../../../../shared/models/app-profile.model';
import { AppDetails } from './../../../../shared/models/app-details.model';
import { NgoDetails } from './../../../../shared/models/ngo-details.model';
import { CivicFileValidationResult } from './../../../../shared/models/file-validation-result.model';

import { AppService } from './../../../../services/app.service';
import { CategoriesService } from './../../../../services/category.service';
import { TechnologiesService } from './../../../../services/technology.service';
import { TagsService } from './../../../../services/tags.service';
import { AddAppModel } from './../../services/add-app.model';

import './add-app.component.scss';


@Component({
    selector: 'add-app',
    providers: [AppService, TagsService, CategoriesService, UploadService, TechnologiesService],
    templateUrl: './add-app.template.html',
})

export class AddAppComponent implements OnInit, OnChanges {


    constructor(private appService: AppService, private tagsService: TagsService, private categoriesService: CategoriesService, private uploadService: UploadService, private technologiesService: TechnologiesService) {

        this.submitted = false;
        this.isAddingNewApp = true;
    }


    @Input() app: AddAppModel;
    @Input() isAddingNewApp: boolean
    public categories: Array<Object> = [{ id: null, text: 'Alege o categorie' }];
    public tags: Array<string> = [];
    public technologies: Array<string> = [];
    private value: any = {};
    private selectedAppTags: Array<string> = [];
    private selectedAppTechnologies: Array<string> = [];
    private newTag: string;
    private newTechnology: string;
    private submitted: boolean;
    private message;
    private error;
    private appLogo: CivicFile;
    private ngoLogo: CivicFile;
    private isAppLogoUploaded: boolean;
    private isAppLogoValid: boolean;
    private isNgoLogoUploaded: boolean;
    private isNgoLogoValid: boolean;
    private needsToUpdateAppLogo: boolean;
    private needsToUpdateNgoLogo: boolean;
    public phoneRegex = '\\+4\\d{10}';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['app']) {
            this.submitted = false;
            this.newTag = '';
            this.newTechnology = '';
            this.value = this.app ? this.app.apphashtags : '';
            
            this.selectedAppTags = (this.app && this.app.apphashtags) ? this.app.apphashtags.split("#"): [];
            

        }
    }

    ngOnInit() {

        if (this.isAddingNewApp) {
            //console.log('is adding new app');
            this.app = new AddAppModel();
            this.setDefaultsForLogoRelated();
            this.app.appcategoryid = null;
        }
        else{
            this.setDefaultsForLogoWhenEditingApp();
        }


        this.categoriesService.getCategories()
            .subscribe(cats => {
                this.categories = this.categories.concat(cats.map((category) => {
                    return { id: category.id, text: category.catname }
                }))
            })
        this.technologiesService.getTechnologies()
            .subscribe(response => {
                this.technologies = response
            })
    }

    public selectTags(value: any): void {
        //console.log('raised selectTags');
        this.newTag = '';
        this.selectedAppTags.push(value.text)
    }

    public selectTechnologies(value: any): void {
        //console.log('raised selectTags');
        this.newTechnology = '';
        this.selectedAppTechnologies.push(value.text)
    }


    public selectCat(value: any): void {
        this.app.appcategoryid = value.id
    }


    public refreshValue(value: any): void {
        //console.log('raised refreshValue');
        this.value = value;
    }

    public removeTags(value: any): void {
        //console.log('raised removeTags');
        this.selectedAppTags.splice(this.selectedAppTags.indexOf(value.text), 1);
    }

    public removeTechnologies(value: any): void {
        //console.log('raised removeTags');
        this.selectedAppTechnologies.splice(this.selectedAppTechnologies.indexOf(value.text), 1);
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

    public loadTechnologies(value: any): void {
        let searchTerm = value;
        if (searchTerm && searchTerm.length) {
            

            // this.tagsService.getTags(searchTerm)
            //     .subscribe(tags => {
            //         this.tags = tags.map(function (item) {
            //             return { text: item['Tag'] }
            //         });
            //     })
        }


    }



    appLogoChangeEvent(fileInput: any) {
        this.isAppLogoValid = true;
        this.needsToUpdateAppLogo = !this.isAddingNewApp;
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
        this.needsToUpdateNgoLogo = !this.isAddingNewApp;
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
            if (r != '200') {
                var msg = 'Eroare la upload-ul logo-urilor! '
                if (!this.isAddingNewApp) {
                    msg = msg + r.message;
                }
                this.handleLogoUploadError(isUploadingAppLogo, msg);
            }

        }).catch((err) => {
            this.handleLogoUploadError(isUploadingAppLogo, err);
        });
    }

    private handleLogoUploadError(isUploadingAppLogo: boolean, err: any) {
        if (isUploadingAppLogo) {
            this.isAppLogoUploaded = false;
        } else {
            this.isNgoLogoUploaded = false;
        }
        this.error = err.toString();
    }

    addApp(form) {
        if (this.isAddingNewApp) {
            this.addNewApp(form)
        } else {
            this.editExistingApp(form)
        }

    }

    private editExistingApp(form) {
        //console.log('submit for edit')
        this.submitted = true;
        
        var l1 = new Promise((resolve, reject) => {
                this.isAppLogoUploaded = true;
                resolve('')
            });

        var l2 = new Promise((resolve, reject) => {
                this.isNgoLogoUploaded = true;
                resolve('')
            });

        if (this.isAppLogoValid && this.isNgoLogoValid) {
            //console.log('editing app logo');
            if(this.needsToUpdateAppLogo){
                l1 = this.uploadLogo(this.appLogo, true);
            }
            

            
            if (this.isNgoLogoValid && this.ngoLogo && this.needsToUpdateNgoLogo) {
                //console.log('editing ngo logo');
                l2 = this.uploadLogo(this.ngoLogo, false);
            }

            Promise.all([l1, l2]).then(() => {
                if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {
                    //console.log('editing started');

                    if (form.valid) {
                        //console.log('app hashtags before '+ this.app.apphashtags)
                        this.app.apphashtags.length ? this.app.apphashtags = this.app.apphashtags.split(" #").join("#")
                            : this.app.apphashtags = "";
                        this.app.apptechnologies.length ? this.app.apptechnologies = this.app.apptechnologies
                            : this.app.apptechnologies = "";
                        
                        //console.log('app hashtags after '+ this.app.apphashtags)

                        this.appService.editApp(this.app)
                            .subscribe(response => {
                                this.message = response.data
                                //console.log('response este')
                                //console.log(response)
                                if (this.message === 'success') {

                                    this.error = null;
                                    this.setDefaultsForLogoWhenEditingApp();
                                    window.scrollTo(0, 0);
                                    console.log('succes')

                                }

                                else {
                                    let errorRegex = /\(ERROR\)\:(.*)/;
                                    this.error = errorRegex.exec(response.data);
                                    console.log('ERROR')

                                }
                            })
                    }
                }
            });
        }
    }

    private addNewApp(form) {
        //console.log('form', form)
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
                        this.selectedAppTechnologies.length ? this.app.apptechnologies = this.selectedAppTechnologies.toString() + this.newTechnology
                            : this.app.apptechnologies = this.newTechnology;

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

    private setDefaultsForLogoWhenEditingApp(){
        this.isAppLogoUploaded = false;
        this.isAppLogoValid = true;
        this.isNgoLogoUploaded = false;
        this.isNgoLogoValid = true; //da, true
        this.needsToUpdateAppLogo = false;
        this.needsToUpdateNgoLogo = false;
        
    }


}