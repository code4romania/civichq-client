import { Component } from '@angular/core';

import { HeaderComponent} from './header/header.component.ts'

import './app.component.scss';


@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Angular 2 starter';

  constructor(){

  }
}