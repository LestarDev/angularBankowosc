import { Injectable } from '@angular/core';
import userAppType, { simpleSocialUserNotUse } from '../private/userAppType';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class DataFlowService {

  okeyLogedIn: boolean = false;

  userApp: userAppType = {
    isGoogleUser: false,
    userService: {authorizationCode: "", authToken: "",email: "", firstName:"", id:"", idToken:"", lastName:"",name:"",photoUrl:"",provider:"",response:""},
    email: "",
    name: "",
    lastname: ""
  }

  constructor() { 
    
  }

  getOkeyLogedIn() {return this.okeyLogedIn}

  setOkeyLogedIn(v: boolean) {this.okeyLogedIn=v}

  setUserWithGoogle(newUserService: SocialUser) {
   
        this.userApp = {
          isGoogleUser: true,
          userService: newUserService,
          email: newUserService.email,
          name: newUserService.firstName,
          lastname: newUserService.lastName
        }
      
  }

  setUserWithoutGoogle(newEmail: string, newName: string, newLastName: string){
    this.userApp = {
      isGoogleUser: false,
      userService: simpleSocialUserNotUse,
      name: newName,
      lastname: newLastName,
      email: newEmail
    }
  }

  getUserApp() {return this.userApp}

  resetUserApp(){
    this.userApp = {
      isGoogleUser: false,
      userService: {authorizationCode: "", authToken: "",email: "", firstName:"", id:"", idToken:"", lastName:"",name:"",photoUrl:"",provider:"",response:""},
      email: "",
      name: "",
      lastname: ""
    }
  }

}
