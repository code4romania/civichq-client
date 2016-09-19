import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';


import { ApproveAppComponent } from './components/approve-app/approve-app.component';

import { ApproveAppRouting } from './config/approve-app.routing';

@NgModule({
    imports: [
        ApproveAppRouting,
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        ApproveAppComponent,
    ],
    exports: [
        ApproveAppComponent
    ]
})

export class ApproveAppModule { }