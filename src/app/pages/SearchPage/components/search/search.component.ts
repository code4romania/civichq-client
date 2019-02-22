import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../../../../services/app.service';
import  { App } from '../../../../shared/models/app.model';

@Component({
    selector: 'search-results',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
    filter:string;
    apps: App;
    constructor(private route:ActivatedRoute, private appService: AppService,private router:Router ) {

    }

    ngOnInit() {
        this.route.params.subscribe(async (data) => {
            this.filter = null;
            this.filter = data['filter'];
            if (this.filter) {
                this.apps = await this.appService.searchBy(this.filter);
            }
        })
    }
    goToApp(app) {
        let appName = app.appName = app.appName.replace(/\s+/g, '');
        let link = ['/apps', app.id, appName];
        this.router.navigate(link);

    }

}
