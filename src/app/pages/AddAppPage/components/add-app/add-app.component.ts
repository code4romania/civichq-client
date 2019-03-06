import {CivicFile} from '../../../../shared/models/civic-file.model';
import {UploadService} from '../../../../services/upload.service';
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

import {AppService} from '../../../../services/app.service';
import {CategoriesService} from '../../../../services/category.service';
import {TagsService} from '../../../../services/tags.service';
import {AddAppModel} from '../../services/add-app.model';
import {concat, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {AppTag} from "../../../../shared/models/app-tag.model";



@Component({
    selector: 'add-app',
    providers: [AppService, TagsService, CategoriesService, UploadService],
    templateUrl: './add-app.template.html',
    styleUrls: ['./add-app.component.scss']
})

export class AddAppComponent implements OnInit, OnChanges {


    constructor(private appService: AppService, private tagsService: TagsService, private categoriesService: CategoriesService, private uploadService: UploadService) {

        this.submitted = false;
        this.isAddingNewApp = true;
    }

    @Input() app: AddAppModel;
    @Input() isAddingNewApp: boolean;
    public categories: Array<Object> = [{id: null, text: 'Alege o categorie'}];
    public tagsObservable: Observable<AppTag[]>;
    public tagInput: Subject<String> = new Subject<String>();
    public tagsLoading: boolean = false;
    private value: any = {};
    public selectedAppTags: string[] = [];
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
    private needsToUpdateAppLogo: boolean;
    private needsToUpdateNgoLogo: boolean;
    public phoneRegex = '\\+4\\d{10}';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['app']) {
            this.submitted = false;
            this.newTag = '';
            this.value = this.app ? this.app.apphashtags : '';
            this.selectedAppTags = (this.app && this.app.apphashtags) ? this.app.apphashtags.split(" ") : [];
        }
    }

    ngOnInit() {
        if (this.isAddingNewApp) {
            this.app = new AddAppModel();
            this.setDefaultsForLogoRelated();
            this.app.appcategoryid = null;
        } else {
            this.setDefaultsForLogoWhenEditingApp();
        }
        this.initTagsInput();
        this.categoriesService.getCategories()
            .then(cats => {
                this.categories = this.categories.concat(cats.map((category) => {
                    return {id: category.id, text: category.catname}
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

    public initTagsInput() {
        this.tagsObservable = concat(
            of([]), // default items
            this.tagInput.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.tagsLoading = true),
                switchMap(term => {
                    let searchTerm = term.replace('#', '');
                    return this.tagsService.getTags(searchTerm).pipe(
                        catchError(() => of([])), // empty list on error
                        tap(() => this.tagsLoading = false)
                    );
                })
            )
        );
    }

    appLogoChangeEvent(fileInput: any) {
        this.isAppLogoValid = true;
        this.needsToUpdateAppLogo = !this.isAddingNewApp;
        var theLogo = fileInput.target.files[0];
        this.app.applogoname = UploadService.GetNewLogoName(theLogo.name);
        this.appLogo = new CivicFile(theLogo, this.app.applogoname);

        var isFileAllowed = this.uploadService.IsFileAllowed(this.appLogo);

        if (!isFileAllowed.IsValid) {
            this.error = isFileAllowed.ErrorMessage;
            this.isAppLogoValid = false;
            this.app.applogoname = '';
            this.appLogo = null;
        }
    }

    ngoLogoChangeEvent(fileInput: any) {
        this.isNgoLogoValid = true;
        this.needsToUpdateNgoLogo = !this.isAddingNewApp;
        var theLogo = fileInput.target.files[0];
        this.app.ngologoname = UploadService.GetNewLogoName(theLogo.name);
        this.ngoLogo = new CivicFile(theLogo, this.app.ngologoname);

        var isFileAllowed = this.uploadService.IsFileAllowed(this.ngoLogo);

        if (!isFileAllowed.IsValid) {
            this.error = isFileAllowed.ErrorMessage;
            this.isNgoLogoValid = false;
            this.app.ngologoname = '';
            this.ngoLogo = null;
        }
    }

    private uploadLogo(theLogo: CivicFile, isUploadingAppLogo: boolean): Promise<any> {
        return this.uploadService.uploadLogo(theLogo).then(r => {
            if (isUploadingAppLogo) {
                this.isAppLogoUploaded = (r == '200');
            } else {
                this.isNgoLogoUploaded = (r == '200');
            }
            if (r != '200') {
                var msg = 'Eroare la upload-ul logo-urilor! ';
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
            if (this.needsToUpdateAppLogo) {
                l1 = this.uploadLogo(this.appLogo, true);
            }


            if (this.isNgoLogoValid && this.ngoLogo && this.needsToUpdateNgoLogo) {
                l2 = this.uploadLogo(this.ngoLogo, false);
            }

            Promise.all([l1, l2]).then(async () => {
                if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {

                    if (form.valid) {
                        this.app.apphashtags = this.selectedAppTags.length ?  this.selectedAppTags.join(" ") : "";

                        let response = await this.appService.editApp(this.app);
                        this.message = response['data'];
                        if (this.message === 'success') {
                            this.error = null;
                            this.setDefaultsForLogoWhenEditingApp();
                            console.log('succes')

                        } else {
                            let errorRegex = /\(ERROR\)\:(.*)/;
                            this.error = errorRegex.exec(this.message);
                            console.log('ERROR')

                        }

                    }
                }
            });
        }
    }

    private addNewApp(form) {
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

            Promise.all([l1, l2]).then(async () => {
                if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {

                    if (form.valid) {
                        this.app.apphashtags = this.selectedAppTags.length ? this.selectedAppTags.join(" ") : "";

                        var response = await this.appService.addApp(this.app);

                        this.message = response['result'];
                        if (this.message === 'success') {
                            this.error = null;
                            this.setDefaultsForLogoRelated();
                        } else {
                            let errorRegex = /\(ERROR\):(.*)/;
                            this.error = errorRegex.exec(this.message)[1];
                        }
                    }
                }

            });
        } else {
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

    private setDefaultsForLogoWhenEditingApp() {
        this.isAppLogoUploaded = false;
        this.isAppLogoValid = true;
        this.isNgoLogoUploaded = false;
        this.isNgoLogoValid = true; //da, true
        this.needsToUpdateAppLogo = false;
        this.needsToUpdateNgoLogo = false;

    }
}
