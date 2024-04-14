import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataFlowService } from "../../service/data-flow.service";
import { InputLoginComponent } from "../../components/input-login/input-login.component";
import { FormReviewsComponent } from "../../components/form-reviews/form-reviews.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, InputLoginComponent, FormReviewsComponent],
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

  ngOnInit(): void {
    

      if(this.dataFlow.getUserApp().name===""){
        this.router.navigate(['/login']);
      }

  }

  logOut(): void {
    
    this.dataFlow.resetUserApp();
    this.router.navigate(['/login']).then(()=>{
      this.socialAuthService.signOut()
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(()=>{this.router.navigate(['/login'])})
    });
    
    

  }
}
