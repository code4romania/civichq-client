import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'header-component',
    templateUrl: './header.template.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent{
    public isCollapsed: boolean = true;

    @ViewChild('searchBox')
    private searchBox : ElementRef;
    
    constructor(private router: Router, private route: ActivatedRoute){
        router.events.subscribe((val) => {
            this.searchBox.nativeElement.value = '';
            this.isCollapsed = true;
            window.scrollTo(0,0);
        });
    }

    search(query){
        if (query.trim()){
            this.router.navigate(['/search',{filter: query.trim()}]);
        }

    }
}
