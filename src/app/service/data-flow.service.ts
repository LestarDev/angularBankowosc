import { Injectable } from '@angular/core';
import userAppType from '../private/userAppType';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class DataFlowService {

  okeyLogedIn: boolean = false;

  userApp: userAppType = {
    isGoogleUser: false,
    userService: {authorizationCode: "", authToken: "",email: "", firstName:"", id:"", idToken:"", lastName:"",name:"",photoUrl:"",provider:"",response:""}
  }

  constructor() { 
    
  }

  getOkeyLogedIn() {return this.okeyLogedIn}

  setOkeyLogedIn(v: boolean) {this.okeyLogedIn=v}

  setUserApp(newUserApp: userAppType | boolean, newUserService?: SocialUser) {
    if(typeof newUserApp == 'boolean'){
      if(newUserService == null){
        console.log("[Error] Data Flow => newUserService at setUserApp doesn't exist");
      }else{
        console.log("[Info] Set userApp correctly")
        this.userApp = {
          isGoogleUser: newUserApp,
          userService: newUserService
        }
      }
    }else{
      this.userApp = newUserApp;
    }
  }

  getUserApp() {return this.userApp}

}
