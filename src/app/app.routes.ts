import { Routes } from '@angular/router';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ProductDashboardComponent } from './components/products/product-dashboard/product-dashboard.component';
import { authGuard } from './core/auth.guard';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
{ path:'signup',component:SignUpComponent },
{ path:'login',component:LoginComponent },
{ path:'products',component:ProductDashboardComponent,canActivate:[authGuard]},
{ path:'products/details/:name',component:ProductDetailsComponent,canActivate:[authGuard]},
{ path:'cart',component:CartComponent,canActivate:[authGuard]}

];
