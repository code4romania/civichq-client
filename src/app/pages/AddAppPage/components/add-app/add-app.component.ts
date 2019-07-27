import {CivicFile} from '../../../../shared/models/civic-file.model';
import {UploadService} from '../../../../services/upload.service';
import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';

import {AppService} from '../../../../services/app.service';
import {CategoriesService} from '../../../../services/category.service';
import {TagsService} from '../../../../services/tags.service';
import {AddAppModel} from '../../services/add-app.model';
import {concat, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {AppTag} from "../../../../shared/models/app-tag.model";
import {TechnologiesService} from "../../../../services/technology.service";



@Component({
    selector: 'add-app',
    providers: [AppService, TagsService, TechnologiesService, CategoriesService, UploadService],
    templateUrl: './add-app.template.html',
    styleUrls: ['./add-app.component.scss']
})

export class AddAppComponent implements OnInit, OnChanges {


    constructor(private appService: AppService, private tagsService: TagsService, private technologiesService: TechnologiesService, private categoriesService: CategoriesService, private uploadService: UploadService) {

        this.submitted = false;
        this.successful = false;
        this.isAddingNewApp = true;
    }

    @Input() app: AddAppModel;
    @Input() isAddingNewApp: boolean;
    public categories: Array<Object> = [{id: null, text: 'Alege o categorie'}];
    public tagsObservable: Observable<AppTag[]>;
    public tagInput: Subject<String> = new Subject<String>();
    public tagsLoading: boolean = false;
    public availableTechnologies: Array<String>;
    private value: any = {};
    public selectedAppTags: string[] = [];
    public selectedTechnologies: string[] = [];
    private newTag: string;
    private submitted: boolean;
    private successful: boolean;
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

    @ViewChild('appLogoInput') appLogoInputRef: ElementRef;
    @ViewChild('ngoLogoInput') ngoLogoInputRef: ElementRef;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['app']) {
            this.submitted = false;
            this.newTag = '';
            this.value = this.app ? this.app.apphashtags : '';
            this.selectedAppTags = (this.app && this.app.apphashtags) ? this.app.apphashtags.split(' ') : [];
            this.selectedTechnologies = (this.app && this.app.apptechnologies) ? this.app.apptechnologies.split(',') : [];
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
        this.getAllTechnologies();
        this.categoriesService.getCategories()
            .then(cats => {
                this.categories = this.categories.concat(cats.map((category) => {
                    return {id: category.id, text: category.catname};
                }));
            });
    }

    public selectTags(value: any): void {
        this.newTag = '';
        this.selectedAppTags.push(value.text);
    }

    public selectCat(value: any): void {
        this.app.appcategoryid = value.id;
    }

    public refreshValue(value: any): void {
        this.value = value;
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

    public async getAllTechnologies() {
        this.availableTechnologies = await this.technologiesService.getTechnologies();
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
        const theLogo = fileInput.target.files[0];
        this.app.ngologoname = UploadService.GetNewLogoName(theLogo.name);
        this.ngoLogo = new CivicFile(theLogo, this.app.ngologoname);

        const isFileAllowed = this.uploadService.IsFileAllowed(this.ngoLogo);

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
                let msg = 'Eroare la upload-ul logo-urilor! ';
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
            this.addNewApp(form);
        } else {
            this.editExistingApp(form);
        }

    }


    private parseAppTagsForSave(): string {
        if (this.selectedAppTags.length) {
            // an item may contain whitespaces: create hashtag for each word.
            this.selectedAppTags = this.selectedAppTags.join(' ').split(' ').map(tag => {
                // add # when it does not exist.
                return tag[0] !== '#' ? '#' + tag : tag;
            });
            return this.selectedAppTags.join(' ');
        } else {
            return '';
        }
    }

    private editExistingApp(form) {
        this.submitted = true;

        let l1 = new Promise((resolve, reject) => {
            this.isAppLogoUploaded = true;
            resolve('');
        });

        let l2 = new Promise((resolve, reject) => {
            this.isNgoLogoUploaded = true;
            resolve('');
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
                        this.app.apphashtags = this.parseAppTagsForSave();
                        this.app.apptechnologies = this.selectedTechnologies.join(',');

                        const response = await this.appService.editApp(this.app);
                        this.message = response['data'];
                        if (this.message === 'success') {
                            this.error = null;
                            this.setDefaultsForLogoWhenEditingApp();
                        } else {
                            const errorRegex = /\(ERROR\)\:(.*)/;
                            this.error = errorRegex.exec(this.message);
                        }
                        AddAppComponent.scrollToTop();
                    }
                }
            });
        }
    }

    private addNewApp(form) {
        this.successful = false;
        this.submitted = true;

        if (this.isAppLogoValid && this.isNgoLogoValid) {
            const l1 = this.uploadLogo(this.appLogo, true);

            let l2 = new Promise((resolve, reject) => {
                this.isNgoLogoUploaded = true;
                resolve('');
            });
            if (this.isNgoLogoValid && this.ngoLogo) {
                l2 = this.uploadLogo(this.ngoLogo, false);
            }

            Promise.all([l1, l2]).then(async () => {
                if (this.isAppLogoUploaded && this.isNgoLogoUploaded) {

                    if (form.valid) {
                        this.app.apphashtags = this.parseAppTagsForSave();
                        this.app.apptechnologies = this.selectedTechnologies.join(',');
                        const response = await this.appService.addApp(this.app);

                        this.message = response['result'];
                        if (this.message === 'success') {
                            this.submitted = false;
                            this.successful = true;
                            this.error = null;
                            form.reset();
                            this.setFormDefaults();
                        } else {
                            const errorRegex = /\(ERROR\):(.*)/;
                            this.error = errorRegex.exec(this.message)[1];
                        }
                        AddAppComponent.scrollToTop();
                    }
                }

            });
        } else {
            this.error = 'Logo-ul aplicației sau al organizației este invalid, poate sa fie doar .png sau .jpg, maxim 500px x 500px.';
            AddAppComponent.scrollToTop();
        }
    }

    private setDefaultsForLogoRelated() {
        if (this.appLogoInputRef) {
            this.appLogoInputRef.nativeElement.value = null;
        }
        if (this.ngoLogoInputRef) {
            this.ngoLogoInputRef.nativeElement.value = null;
        }
        this.ngoLogo = null;
        this.appLogo = null;
        this.isAppLogoUploaded = false;
        this.isAppLogoValid = false;
        this.isNgoLogoUploaded = false;
        this.isNgoLogoValid = true;
    }

    private setDefaultsForLogoWhenEditingApp() {
        this.isAppLogoUploaded = false;
        this.isAppLogoValid = true;
        this.isNgoLogoUploaded = false;
        this.isNgoLogoValid = true;
        this.needsToUpdateAppLogo = false;
        this.needsToUpdateNgoLogo = false;

    }

    private setFormDefaults() {
        this.setDefaultsForLogoRelated();
        this.selectedAppTags = [];
        this.selectedTechnologies = [];
    }

    private static scrollToTop() {
        (function scrollSmoothly() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(scrollSmoothly);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
}
