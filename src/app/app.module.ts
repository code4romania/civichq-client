import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { CarouselModule} from 'ng2-bootstrap/ng2-bootstrap';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent} from './components/header/header.component';

import { routing } from './app.routing';

import { HomeModule } from './pages/HomePage/home.module';
import { ProfileModule } from './pages/ProfilePage/profile.module';


const routes: Routes = [

];

@NgModule({
  imports: [
    BrowserModule,
    routing,
    // CarouselModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HomeModule,
    ProfileModule
  ],
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
