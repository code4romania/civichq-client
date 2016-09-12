import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppProfileComponent } from './components/app-profile/app-profile.component';
import { AppDetailsComponent } from './components/app-profile/app-details/app-details.component';
import { NgoDetailsComponent } from './components/app-profile/ngo-details/ngo-details.component';


import { ProfileRouting } from './config/profile.routing';


@NgModule({
  imports: [
    ProfileRouting,
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppProfileComponent,
    AppDetailsComponent,
    NgoDetailsComponent
  ],
  exports: [
    AppProfileComponent,
    AppDetailsComponent,
    NgoDetailsComponent
  ]
})
export class ProfileModule { }
