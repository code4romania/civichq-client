import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { SearchRouting } from './config/search.routing';
import { SearchComponent } from './components/search/search.component';
import { AppService } from '../../services/app.service';


@NgModule({
    imports: [
        SearchRouting,
        BrowserModule,
        HttpModule,
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        AppService
    ],
    exports: [
        SearchComponent
    ]
})

export class SearchModule { }
