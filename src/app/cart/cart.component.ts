import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from 'src/product';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items: Product[] = [];
  quantity: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('CartComponent ngOnInit called');
    this.authService.getUserData().subscribe((user) => {
      if (user) {
        this.cartService.items$.subscribe((items) => {
          this.items = items;
        });
      }
    });
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      console.log('isLoggedIn:', isLoggedIn);
      if (isLoggedIn) {
        this.items = this.cartService.getItems();
        console.log(this.items);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getTotalCost() {
    // Calculate the subtotal by summing up the price times the quantity of each item in the cart
    const subtotal = this.items.reduce(
      (total, item) => total + item.price * item.quantity!,
      0
    );

    // Calculate the VAT (Value Added Tax) as a percentage of the subtotal
    const vat = subtotal * 0.2; // 20% VAT

    // Calculate the total cost by adding the subtotal and VAT
    const total = subtotal + vat;

    return total.toFixed(2);
  }
  removeItem(item: Product) {
    // Remove the item from the items array
    this.items = this.items.filter((i) => i !== item);

    // Update the cart service
    this.cartService.removeFromCart(item);
  }

  decreaseQuantity(item: Product) {
    if (item.quantity! > 1) {
      item.quantity!--;
    }
  }

  increaseQuantity(item: Product) {
    item.quantity!++;
  }

  continueShopping() {
    this.router.navigate(['/store']);
  }

  proceedToCheckout() {
    this.router.navigate(['cart/checkout'], { state: { redirected: true } });
  }
}
