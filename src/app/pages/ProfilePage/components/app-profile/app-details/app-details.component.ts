import {Component, Input, OnInit} from '@angular/core';
import {AppDetails} from '../../../../../shared/models/app-details.model';

@Component({
    selector: 'app-details',
    templateUrl: './app-details.template.html',
    styleUrls: ['./app-details.component.scss']

})

export class AppDetailsComponent implements OnInit {

    @Input() appDetails: AppDetails;
    technologies: string[] = [];

    ngOnInit(): void {
        this.technologies = this.appDetails && this.appDetails.technologies ? this.appDetails.technologies.split(',') : [];
    }
}
