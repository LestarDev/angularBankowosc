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
    console.log(this.dataFlow.getUserApp().userService);
    if(this.dataFlow.getUserApp().userService.id == "") {
      // console.log(this.isLoggedin)
     this.logOut();
    }
    if(this.dataFlow.getUserApp().userService.id != ""){
      this.socialUser = this.dataFlow.getUserApp().userService
    }

  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login'])
  }
}
