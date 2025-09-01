import { Routes } from '@angular/router';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductDashboardComponent } from './Components/product-dashboard/product-dashboard.component';
import { authGuard } from './Core/auth.guard';

export const routes: Routes = [
{ path:'signup',component:SignUpComponent },
{ path:'login',component:LoginComponent },
{ path:'products',component:ProductDashboardComponent,canActivate:[authGuard]}
];
