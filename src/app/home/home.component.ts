import { Component, OnInit } from '@angular/core';
import { Leader} from '../shared/Leaders';
import { LeaderService } from '../services/leader.service';
import {leader1} from '../services/leader1';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  leaders: Leader[];
  leaders1: Leader;
  
  constructor(private leaderService: LeaderService) { 
  }

  ngOnInit() {
  this.leaders = this.leaderService.getLeaders();

   
  }
}
