import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularBankowosc';

  constructor(public router: Router){}

  loginWithGoogle(componentRef:any){
    if(!(componentRef instanceof LoginPageComponent)) return;
    const comRef : LoginPageComponent = componentRef;
    console.log("yyyyyyy");
    
  }

}
