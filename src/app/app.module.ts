import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ActivationInstructionsComponent } from './activation-instructions/activation-instructions.component';
import {MatCardModule} from '@angular/material/card';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DonateComponent } from './donate/donate.component';
import { CartComponent } from './cart/cart.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { OrderFormComponent } from './orderform/orderform.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ActivateAccountComponent,
    NavbarComponent,
    DropdownComponent,
    ActivationInstructionsComponent,
    ProductCatalogComponent,
    ProductDetailsComponent,
    DonateComponent,
    CartComponent,
    LoginDialogComponent,
    CartDialogComponent,
    FooterComponent,
    OrderFormComponent,
    OrderCompleteComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule ,
    MatMenuModule,
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
