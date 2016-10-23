import { Component, OnInit,Input} from '@angular/core';
import { AppDetails } from './../../../../../shared/models/app-details.model';

//import imgSrc from './mock-logo.png';

@Component({
    selector: 'app-details',
    templateUrl: './app-details.template.html'

})

export class AppDetailsComponent {

    @Input() appDetails: AppDetails;

}