import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule} from 'ng2-bootstrap/ng2-bootstrap';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HeaderComponent} from './header/header.component';
import { AppProfileComponent } from './app-profile/app-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

];

@NgModule({
  imports: [
    BrowserModule,
    routing,
    CarouselModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [
    HeaderComponent,
    AppProfileComponent,
    HomeComponent,
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
