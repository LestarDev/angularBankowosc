import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import reviewType, { starType } from '../../private/reviewType';
import "./form-reviews.component.css"
import { DataFlowService } from '../../service/data-flow.service';

@Component({
  selector: 'app-form-reviews',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  providers: [DatePipe],
  templateUrl: './form-reviews.component.html',
  styleUrl: './form-reviews.component.css'
})
export class FormReviewsComponent {

  @Output() newReviewEmitter =  new EventEmitter<reviewType>();

  constructor(public dataFlow: DataFlowService,private datePipe: DatePipe){}

  // fullStar ="<i class='fa-solid fa-star'></i>";
  fullStar = faStar
  // spaceStar: string ="<i class='fa-regular fa-star'></i>";
  spaceStar = faStarRegular
  // halfStar: string = "<i class='fa-solid fa-star-half-stroke'></i>";
  halfStar = faStarHalfStroke;
  rationInt: number = 10;

  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  // todayDate="";

  review: reviewType = {
    byWho: this.dataFlow.getUserApp().name+" "+this.dataFlow.getUserApp().lastname,
    data: "",
    idWho: this.dataFlow.getUserApp().id,
    rate: 10,
    date: this.todayDate
  }

  rememberIshalf = {isHalf: false, indexhalf: 0};

  starsToShow: starType[] = [
    {star: this.fullStar, index: 1},
    {star: this.fullStar, index: 2},
    {star: this.fullStar, index: 3},
    {star: this.fullStar, index: 4},
    {star: this.fullStar, index: 5},
  ];

  showStars(divEl: HTMLDivElement, ration: string){

    this.rememberIshalf.isHalf=false;
    
    this.starsToShow = [];

    this.rationInt = (ration as unknown) as number;

    this.review.rate=this.rationInt;

    for(let i=1; i<=5; i++){
      if(this.rationInt>0){
        if(this.rationInt%2 ==0){
          this.rationInt-=2;
          this.starsToShow.push({
            star: this.fullStar,
            index: i
          });
        }else{
          this.rationInt-=1;
          this.rememberIshalf.isHalf=true;
          this.rememberIshalf.indexhalf=i;
          i--;
        }
      }else{

        if(this.rememberIshalf.isHalf){
          this.starsToShow.push({
            star: this.halfStar,
            index: this.rememberIshalf.indexhalf
          });
          this.rememberIshalf.isHalf=false;
        }else{
          this.starsToShow.push({
            star: this.spaceStar,
            index: i
          });
        }

        
      }
    }

    
    

    console.log(this.starsToShow);

  }


  sendUpper(textReview: string, e: Event){
    e.preventDefault();
    this.review.data=textReview;
    console.log(this.review)

    this.newReviewEmitter.emit(this.review);

  }

}
