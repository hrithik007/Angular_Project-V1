import { Component, OnInit, Inject } from '@angular/core';
import { Leader} from '../shared/Leaders';
import { LeaderService } from '../services/leader.service';
import {leader1} from '../services/leader1';
import {Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import {PromotionService} from '../services/promotion.service';
import {Promotion} from '../shared/promotion';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    dish:Dish;
    dishErrMess:string;
    promotion: Promotion;
  

  leaders: Leader[];
  leaders1 = {
      id: '3',
      name: 'Alberto Somayya',
      image: '/assets/images/alberto.png',
      designation: 'Executive Chef',
      abbr: 'EC',
      featured: true,
      // tslint:disable-next-line:max-line-length
      description: 'Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!'
    };
  
  constructor(private dishServices: DishService , private promotionService: PromotionService,private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
  this.dishServices.getFeaturedDish()
  .subscribe(dish => this.dish =dish);
  //   errmess => this.dishErrMess = <any>errmess ); 
  this.promotion = this.promotionService.getFeaturedPromotion(); 
  this.leaderService.getLeaders().subscribe(leader => this.leaders = leader);

   
  }
}
