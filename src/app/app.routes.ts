import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
    {path: "loged", component: MainPageComponent},
    {path: "login", component: LoginPageComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
