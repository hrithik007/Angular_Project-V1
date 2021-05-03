import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leader';
import { Leader } from '../shared/Leaders';
import {leader1} from './leader1';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  // getLeaders(): Promise<Leader[]> {
  //     return new Promise(resolve => {
  //     //Simulate server latency 2 sec delay
  //     setTimeout(() => resolve(LEADERS), 1000);
  
  //   // return Promise.resolve(LEADERS);
  // });
  // }
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }



}