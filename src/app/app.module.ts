import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent} from './components/header/header.component';

import { AppRouting } from './config/app.routing';

import { HomeModule } from './pages/HomePage/home.module';
import { ProfileModule } from './pages/ProfilePage/profile.module';
import { AddAppModule } from './pages/AddAppPage/addApp.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    HomeModule,
    ProfileModule,
    AddAppModule
  ],
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
