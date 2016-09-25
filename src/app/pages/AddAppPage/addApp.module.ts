import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AddAppComponent } from './components/add-app/add-app.component';
import { AddAppRouting } from './config/add-app.routing';
import { SelectModule } from 'ng2-select/ng2-select';

@NgModule({
    imports: [
        AddAppRouting,
        SelectModule,
        BrowserModule,
        HttpModule,
        FormsModule


    ],
    declarations: [
        AddAppComponent,
    ],
    exports: [
        AddAppComponent
    ]
})

export class AddAppModule { }