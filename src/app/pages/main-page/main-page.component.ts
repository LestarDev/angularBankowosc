import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataFlowService } from "../../service/data-flow.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
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
    
      if(this.dataFlow.getUserApp().name==""){
        this.router.navigate(['/loged']);
      }

  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.dataFlow.resetUserApp();
    this.router.navigate(['/login'])
  }
}
