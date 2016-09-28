import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';

import './category.component.scss';
import { AppProfile } from '../../../../shared/models/app-profile.model';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {
    @Input() category;
    private noOfApps = 1;
    private theSlides = [];
    window:Window;

    constructor(@Inject('Window') window:Window, private router:Router) {
        console.log(window.innerWidth);
        this.noOfApps = this.getNumberOfAppsPerSlide(window.innerWidth);
    }

    ngOnInit() {
        console.log(this.window)
        this.theSlides = this.getSlides();

    }

    goToApp(app) {
        let appName = app.appName = app.appName.replace(/\s+/g, '');
        let link = ['/profile', app.id, appName];
        this.router.navigate(link);

    }

    getSlides() {
        return new Array(Math.ceil(this.category.apps.length / this.noOfApps));
    }

    onResize(event) {
        const size = event.target.innerWidth;
        const oldNoOfApps = this.noOfApps;
        this.noOfApps = this.getNumberOfAppsPerSlide(size);
        if (oldNoOfApps != this.noOfApps) {
            this.theSlides = [];
            setTimeout(() => {
                this.theSlides = this.getSlides();
            }, 50);
        }
    }

    getNumberOfAppsPerSlide(size) {
        if (size > 1200) {
            return 3;
        } else if (size <= 1200 && size > 750) {
            return 2;
        } else {
            return 1;
        }
    }
}
