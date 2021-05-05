import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Comment } from '../shared/dishComment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  errMess:string;
  dishIds: string[];
  prev:string;
  next:string;
  feedbackForm : FormGroup;
  feedback:Comment;
  d = new Date();
  n = this.d.toISOString().substring(0, 10);
  date=this.n;
  

  @ViewChild('fform') feedbackFormDirective;



  formErrors = {
    'author': '',
    'comment': ''
  };
  dishcopy: Dish;

  validationMessages = {
   'author': {
      'required':' Name is required.',
      'name': 'Enter the name',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 50 characters long.'
    
      
   
     },
    'comment':{
      'required': 'commment is rerquired',
       'comment': 'Enter a comment'
    },
  };




  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { this.createForm();}

  ngOnInit() {
     this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params)=> this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish;this.dishcopy = dish;this.setPrevNext(dish.id); }
    ,errmess => this.errMess = <any>errmess);
  }
setPrevNext(dishId:string){
  const index = this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  
}

goBack(): void {
  this.location.back();
}

createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)] ],
      comment:['',[Validators.required]],
      rating:'',
      date:this.date,
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }
onValueChanged(data?: any){
  if (!this.feedbackForm) { return;}
  const form = this.feedbackForm;
  for(const field in this.formErrors){
    if(this.formErrors.hasOwnProperty(field)){
      // clear prev error mesage
      this.formErrors[field]="";
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const message = this.validationMessages[field];
        for(const key in control.errors){
          if(control.errors.hasOwnProperty(key)){
            this.formErrors[field] += message[key] + ' ';
          }
        }
      }
    }
  }
}
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.dishcopy.comments.push(this.feedback);
    this.dishService.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish;
      this.dishcopy =dish;
    },
    errmess => {this.dish = null; this.dishcopy =null; this.errMess = <any>errmess});
    this.feedbackForm.reset();
    this.feedbackFormDirective.resetForm({
      author: '',
      comment: '',
      rating:'',
      date:this.date,
    });
     
  }
   
}
