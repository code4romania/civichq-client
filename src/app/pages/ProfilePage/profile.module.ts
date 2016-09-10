import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppProfileComponent } from './components/app-profile/app-profile.component';

import { ProfileRouting } from './config/profile.routing';


@NgModule({
  imports: [
    ProfileRouting
  ],
  declarations: [
    AppProfileComponent
  ],
  exports: [
    AppProfileComponent
  ]
})
export class ProfileModule { }
