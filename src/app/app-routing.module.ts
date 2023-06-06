import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RegisterComponent } from './register/register.component';
import { ActivationInstructionsComponent } from './activation-instructions/activation-instructions.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { DonateComponent } from './donate/donate.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { canActivate, isRedirected } from './services/auth-guard.service';
import { OrderFormComponent } from './orderform/orderform.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [canActivate] },
  { path: 'home', component: HomeComponent, data: { animation: 'isLeft' } },
  { path: 'donate', component: DonateComponent },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'isRight' },
    canActivate: [canActivate],
  },
  {
    path: 'activation-instructions',
    component: ActivationInstructionsComponent,
    canActivate: [isRedirected],
  },
  { path: 'activate-account/:uid/:token', component: ActivateAccountComponent },
  {
    path: 'store',
    component: ProductCatalogComponent,
    data: { animation: 'isRight' },
  },
  { path: 'store/product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'cart/checkout',
    component: OrderFormComponent,
    canActivate: [isRedirected],
  },
  { path: 'order-complete', component: OrderCompleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
