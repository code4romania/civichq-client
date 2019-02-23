import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { TermsComponent } from './components/terms/terms.component';
import { TermsRouting } from './config/terms.routing';

@NgModule({
  imports: [BrowserModule, HttpModule, TermsRouting],
  declarations: [TermsComponent],
    exports: [TermsComponent]
})
export class TermsModule {}