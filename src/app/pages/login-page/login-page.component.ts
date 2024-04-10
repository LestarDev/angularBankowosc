import { GoogleLoginProvider, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { DataFlowService } from '../../service/data-flow.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import apiUsers, { apiUser } from '../../private/fewUsersFromApi';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, SocialLoginModule, HttpClientModule],
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
  apiLink: string = "https://dummyjson.com/users/";
  apiLinkPassword: string = "filter?key=password&value=";
  isInvalidForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    public router: Router,
    public dataFlow: DataFlowService,
    private http: HttpClient
  ) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>
  }

  ngOnInit() {
    // this.dataFlow.setUserApp(true)
    this.navStart.subscribe(()=> console.log("Sub on"))
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      if(this.dataFlow.getUserApp().name==""){
        this.dataFlow.setUserWithGoogle(user);
        this.router.navigate(['/loged'])
      }
      
    });
    
  }

  invalidForm(): void{
    this.isInvalidForm=true;
    this.router.navigate(['/login']);
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

  addUserToForm(idUserPlusOne: number): apiUser {
    return apiUsers[idUserPlusOne-1];
  }

 
  loginWithoutGoogle(login: string, password: string, e: Event): void{
    e.preventDefault();
    
    this.http.get(this.apiLink+this.apiLinkPassword+password).subscribe((data: any)=>{
      const user = data.users[0];
      if(!user) {this.invalidForm(); return};
      if(user.username!=login) {this.invalidForm(); return};
      this.isInvalidForm=false;
      this.dataFlow.setUserWithoutGoogle(user.email, user.firstName, user.maidenName, user.image);
      // console.log(user);
      this.router.navigate(['/loged']);
    });

    

  }

}