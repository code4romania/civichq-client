import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AddAppComponent } from './components/add-app/add-app.component';

import { AddAppRouting } from './config/add-app.routing';

@NgModule({
    imports: [
        AddAppRouting,
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