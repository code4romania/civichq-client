import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule} from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CarouselModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
