import { Component, OnInit,Input} from '@angular/core';
import { NgoDetails } from './../../../../../shared/models/ngo-details.model';

@Component({
    selector: 'ngo-details',
    templateUrl: './ngo-details.template.html'

})

export class NgoDetailsComponent{
    logoSrc = require('./../../../../../assets/images/mock-logo.png');
    @Input() ngoDetails: NgoDetails;

}