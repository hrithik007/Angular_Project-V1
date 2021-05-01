import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leader';
import { Leader } from '../shared/Leaders';
import {leader1} from './leader1';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

}