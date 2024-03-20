import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor (
    public router: Router,
    private socialAuthService: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      
    });
    if(!this.isLoggedin) {
      this.router.navigate(['/login'])
      console.log("x")
    }
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login'])
  }
}
