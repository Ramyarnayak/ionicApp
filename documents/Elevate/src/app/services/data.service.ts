import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Data} from './data.type';
import {ALL_DATA} from '../../assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAllData(): Observable<Data[]> {
    return of(ALL_DATA);
  }
}
