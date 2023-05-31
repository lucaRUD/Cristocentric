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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent,  data: { animation: 'isLeft' }},
  {path:'donate',component:DonateComponent},
  {path: 'register',component:RegisterComponent,  data: { animation: 'isRight' }},
  {path: 'activation-instructions',component:ActivationInstructionsComponent},
  {path: 'activate-account/:uid/:token',component: ActivateAccountComponent},
  {path: 'store',component:ProductCatalogComponent, data: { animation: 'isRight' } },
  { path: 'store/product/:id', component: ProductDetailsComponent },
  {path:'checkout',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
