import { SocialUser } from "@abacritt/angularx-social-login"

type userAppType = {
    isGoogleUser: boolean,
    userService: SocialUser,
    name: string,
    lastname: string,
    email: string,
    imgLink: string,
    id: string
}

export default userAppType

export const simpleSocialUserNotUse = {authorizationCode: "", authToken: "",email: "", firstName:"", id:"", idToken:"", lastName:"",name:"",photoUrl:"",provider:"",response:""}