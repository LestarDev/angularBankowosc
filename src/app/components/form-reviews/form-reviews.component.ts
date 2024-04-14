import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { starType } from '../../private/reviewType';

@Component({
  selector: 'app-form-reviews',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './form-reviews.component.html',
  styleUrl: './form-reviews.component.css'
})
export class FormReviewsComponent {

  // fullStar ="<i class='fa-solid fa-star'></i>";
  fullStar = faStar
  // spaceStar: string ="<i class='fa-regular fa-star'></i>";
  spaceStar = faStarRegular
  // halfStar: string = "<i class='fa-solid fa-star-half-stroke'></i>";
  halfStar = faStarHalfStroke;
  rationInt: number = 10;

  starsToShow: starType[] = [
    {star: this.fullStar, index: 1},
    {star: this.fullStar, index: 2},
    {star: this.fullStar, index: 3},
    {star: this.fullStar, index: 4},
    {star: this.fullStar, index: 5},
  ];

  showStars(divEl: HTMLDivElement, ration: string){
    
    this.starsToShow = [];

    this.rationInt = (ration as unknown) as number;

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
          this.starsToShow.push({
            star: this.halfStar,
            index: i
          });
        }
      }else{
        this.starsToShow.push({
          star: this.spaceStar,
          index: i
        });
      }
    }

    console.log(this.starsToShow);

  }

}
