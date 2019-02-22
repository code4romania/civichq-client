import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from "@ng-select/ng-select";
import {AddAppComponent} from './components/add-app/add-app.component';
import {AddAppRouting} from './config/add-app.routing';

@NgModule({
  imports: [
    AddAppRouting,
    BrowserModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    AddAppComponent
  ],
  exports: [
    AddAppComponent
  ]
})

export class AddAppModule {
}
