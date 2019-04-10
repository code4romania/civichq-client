import {Component, Input, OnInit} from '@angular/core';
import {AppDetails} from '../../../../../shared/models/app-details.model';

import './app-details.component.scss';

@Component({
    selector: 'app-details',
    templateUrl: './app-details.template.html'

})

export class AppDetailsComponent implements OnInit {

    @Input() appDetails: AppDetails;
    technologies: string[] = [];

    ngOnInit(): void {
        this.technologies = this.appDetails && this.appDetails.technologies ? this.appDetails.technologies.split(',') : [];
    }
}
