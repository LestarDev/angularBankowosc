import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      if(this.isLoggedin) this.router.navigate(['/loged']);
    });

    
  }



  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.router.navigate(['/login']);
    // this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    window.location.reload();
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }

 

}