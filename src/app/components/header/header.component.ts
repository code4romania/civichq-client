import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import './header.component.scss';

@Component({
    selector: 'header-component',
    templateUrl: './header.template.html'
})

export class HeaderComponent{
    public isCollapsed: boolean = true;

    constructor(private router: Router, private route: ActivatedRoute){

    }

    search(query){
        if (query.trim()){
            this.router.navigate(['/search',{filter: query.trim()}]);
        }

    }
}