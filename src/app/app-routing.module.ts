import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:'' , component:AuthLayoutComponent , children:[
    {path:"" , redirectTo:"login" , pathMatch:"full"},
    {path:"register" , component:RegisterComponent},
    {path:"login" , component:LoginComponent},
  ]},
  {path:'' , component:BlankLayoutComponent , children:[
    {path:"home" , component:HomeComponent , canActivate:[authGuardGuard]},
    {path:"cart" , component:CartComponent , canActivate:[authGuardGuard]},
    {path:"wishlist" ,component:WishlistComponent , canActivate:[authGuardGuard]},
    {path:"brands" , component:BrandsComponent , canActivate:[authGuardGuard]},
    {path:"categories" , component:CategoriesComponent , canActivate:[authGuardGuard]},
    {path:"products" , component:ProductsComponent , canActivate:[authGuardGuard]},
    {path:"details/:id" , component:DetailsComponent , canActivate:[authGuardGuard]},
    {path:"payment/:id" , component:PaymentComponent , canActivate:[authGuardGuard]},
  ]},
  {path:"**" , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
