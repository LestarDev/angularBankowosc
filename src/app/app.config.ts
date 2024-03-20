import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('20044458338-9beuvhub6pj5dp66ioj51mph1ep8134t.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },]
};

//AIzaSyDrIcRGCSZHfGe1wL7fuOs5ySr0MCgEryc