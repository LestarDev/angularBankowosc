import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataFlowService } from "../../service/data-flow.service";
import { InputLoginComponent } from "../../components/input-login/input-login.component";
import { FormReviewsComponent } from "../../components/form-reviews/form-reviews.component";
import reviewType, { starType } from "../../private/reviewType";
import { faStar, faStarHalfStroke, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, InputLoginComponent, FormReviewsComponent, FontAwesomeModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  socialUser!: SocialUser;
  constructor (
    public router: Router,
    private socialAuthService: SocialAuthService,
    private activedRoute: ActivatedRoute,
    public dataFlow: DataFlowService
  ) {}

  listOfReviews: reviewType[] = [];

  fullStar = faStar;
  // spaceStar: string ="<i class='fa-regular fa-star'></i>";
  spaceStar = faStarRegular;
  // halfStar: string = "<i class='fa-solid fa-star-half-stroke'></i>";
  halfStar = faStarHalfStroke;

  rememberIshalf = {isHalf: false, indexhalf: 0};

  xMark = faXmark;
  

  ngOnInit(): void {
    

      if(this.dataFlow.getUserApp().name===""){
        this.router.navigate(['/login']);
      }

      if(localStorage.getItem("listOfReviews")){
        this.listOfReviews = JSON.parse(localStorage.getItem("listOfReviews") as any)
      }

      

  }

  logOut(): void {
    
    this.dataFlow.resetUserApp();
    this.router.navigate(['/login']).then(()=>{
      this.socialAuthService.signOut()
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(()=>{this.router.navigate(['/login'])})
    });

  }

  addReview(newReview: reviewType){
    
    this.listOfReviews.push(newReview);
    localStorage.setItem("listOfReviews",JSON.stringify(this.listOfReviews as any));
  }

  showStarsX(rationInt: number): starType[]{


    this.rememberIshalf.isHalf=false;
    
    const starsToShowX = [];

    for(let i=1; i<=5; i++){
      if(rationInt>0){
        if(rationInt%2 ==0){
          rationInt-=2;
          starsToShowX.push({
            star: this.fullStar,
            index: i
          });
        }else{
          rationInt-=1;
          this.rememberIshalf.isHalf=true;
          this.rememberIshalf.indexhalf=i;
          i--;
        }
      }else{

        if(this.rememberIshalf.isHalf){
          starsToShowX.push({
            star: this.halfStar,
            index: this.rememberIshalf.indexhalf
          });
          this.rememberIshalf.isHalf=false;
        }else{
          starsToShowX.push({
            star: this.spaceStar,
            index: i
          });
        }

        
      }
    }

    return starsToShowX;

  }

  deleteReview(revirewToDel: reviewType,revIndex: number){
    console.log(revIndex);


    this.listOfReviews.splice(revIndex,1);
    console.log(this.listOfReviews);
    localStorage.removeItem("listOfReviews");
    localStorage.setItem("listOfReviews",JSON.stringify(this.listOfReviews as any));

  }


}
