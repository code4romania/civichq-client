import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Category } from './category.model';

const testCategories = [
  {
    id: 1,
    catname: "Social",
    ordinal: 10,
    apps: [],
  },
  {
    id: 2,
    catname: "Educatie",
    ordinal: 20,
    apps: [],
  },
  {
    id: 3,
    catname: "Mediu",
    ordinal: 30,
    apps: [],
  },
  {
    id: 4,
    catname: "Transparenta",
    ordinal: 40,
    apps: [],
  },
  {
    id: 5,
    catname: "Politic",
    ordinal: 50,
    apps: [],
  },
  {
    id: 6,
    catname: "Servicii",
    ordinal: 60,
    apps: [],
  }
]

@Injectable()
export class CategoriesService {

  apiUrl = 'http://localhost:8080/api';
  constructor(private http: Http) { }
  someOther = 'asd';

  getCategories() {
    // return this.http.get(`${this.apiUrl}/category`)
    return Observable.of(testCategories)
        // .map((r: Response) => {
        .map((r) => {
          console.log(r as Category[]);
          return r as Category[];
          // return r.json().data as Category[]
        });
  }
}
