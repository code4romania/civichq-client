import {enableProdMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CollapseDirective} from "ngx-bootstrap";

import {AppComponent} from './components/app/app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

import {AppRouting} from './config/app.routing';

import {HomeModule} from './pages/HomePage/home.module';
import {ProfileModule} from './pages/ProfilePage/profile.module';
import {AddAppModule} from './pages/AddAppPage/addApp.module';
import {ApproveAppModule} from './pages/ApproveApp/approveApp.module';
import {LoginModule} from './pages/LoginPage/login.module';
import {SearchModule} from './pages/SearchPage/search.module';
import { TermsModule } from "./pages/TermsPage/terms.module";

import {AuthService} from './services/auth.service';

import {NgxCaptchaModule} from 'ngx-captcha';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from "./interceptors/jwt.interceptor";

enableProdMode();
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouting,
    HomeModule,
    ProfileModule,
    AddAppModule,
    ApproveAppModule,
    LoginModule,
    SearchModule,
    TermsModule,
    NgxCaptchaModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    CollapseDirective
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
