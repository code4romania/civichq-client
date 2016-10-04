import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { LoginRouting } from './config/login.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule { }