import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Product } from 'src/product';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = '';
  product: any;
  selectedColor = '';
  selectedSize = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {


        this.authService.getUserData().subscribe((user) => {
          if (user) {
            this.cartService.setUserId(user.id.toString());
          }
        });


    const productId = this.route.snapshot.paramMap.get('id');
    this.http
      .get<Product>(
        `http://localhost:8000/accounts/products/${productId}`
      )
      .subscribe((data) => {
        this.product = data;
      });
      const selectedProduct = JSON.parse(
        localStorage.getItem('selectedProduct') || '{}'
      );
      if (selectedProduct) {
        this.product = selectedProduct.product;
        if (selectedProduct.selectedColor) {
          this.selectedColor = selectedProduct.selectedColor;
        }
        if (selectedProduct.selectedSize) {
          this.selectedSize = selectedProduct.selectedSize;
        }
        if(selectedProduct.quantity){
        this.quantity = selectedProduct.quantity;
        }
      }
  }

  addToCart() {
    const productToAdd = {
      ...this.product,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity,
    };
    localStorage.setItem(
      'selectedProduct',
      JSON.stringify({
        product: this.product,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: this.quantity,
      })
    );
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService.getUserData().subscribe((user) => {
          if (user) {
            this.cartService.setUserId(user.id.toString());
            this.cartService.addToCart(productToAdd);
            this.dialog.open(CartDialogComponent);
          }
        });
      } else {
        this.dialog.open(LoginDialogComponent, {
          data: { returnUrl: this.router.url },
        });
      }
    });
  }
  
  
}