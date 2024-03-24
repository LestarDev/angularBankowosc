import { GoogleLoginProvider, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { DataFlowService } from '../../service/data-flow.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, SocialLoginModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  @Output() showLoginEmmiter = new EventEmitter<boolean>();
  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});
  navStart: Observable<NavigationStart>;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    public router: Router,
    public dataFlow: DataFlowService
  ) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>
  }

  ngOnInit() {
    this.dataFlow.setUserApp(true)
    this.navStart.subscribe(()=> console.log("Sub on"))
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      this.dataFlow.setUserApp(true, user);
      this.router.navigate(['/loged'])
    });
    
  }



  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.router.navigate(['/reload']).then(()=>{this.router.navigate(['/login'])});
    
    // this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    window.location.reload();
    // this.showLoginEmmiter.emit(true);
  // this.socialAuthService.signOut(true);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }

 
  loginWithoutGoogle(login: string, password: string, e: Event): void{
    e.preventDefault();
    
  }

}