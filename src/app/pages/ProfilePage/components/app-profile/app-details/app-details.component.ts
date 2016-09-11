import { Component, OnInit,Input} from '@angular/core';
import { AppDetails } from './app-details.model.ts';

@Component({
    selector: 'app-details',
    templateUrl: './app-details.template.html'

})

export class AppDetailsComponent {
    @Input() appDetails: AppDetails;

}