import { AddAppModule } from '../AddAppPage/addApp.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ApproveAppComponent } from './components/approve-app/approve-app.component';
import { ApproveAppRouting } from './config/approve-app.routing';
import {LoggedInGuard} from '../../services/login-guard';


@NgModule({
    imports: [
        ApproveAppRouting,
        BrowserModule,
        FormsModule,
        AddAppModule
    ],
    declarations: [
        ApproveAppComponent
    ],
    providers: [LoggedInGuard],
    exports: [
        ApproveAppComponent
    ]
})

export class ApproveAppModule { }
