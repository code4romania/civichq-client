import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { LoginRouting } from './config/login.routing';

import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        LoginRouting,
        SharedModule
    ],
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule { }