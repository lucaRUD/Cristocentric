import { Injectable } from '@angular/core';
import { Product } from 'src/product';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId: string | null = null;
  items: Product[] = [];
  // Create a BehaviorSubject to emit the items in the cart
  items$ = new BehaviorSubject<Product[]>([]);

  constructor(private authService: AuthService) {
    console.log('CartService constructor called');
    this.authService.getUserData().subscribe((user) => {
      if (user) {
        this.userId = user.id.toString();
        this.items = JSON.parse(
          localStorage.getItem(`cartItems-${this.userId}`) || '[]'
        );
        // Emit the items whenever they are updated
        this.items$.next(this.items);
      }
    });
  }

  addToCart(product: Product) {
    console.log(this.userId);
    if (this.userId) {
      this.items.push(product);
      localStorage.setItem(
        `cartItems-${this.userId}`,
        JSON.stringify(this.items)
      );
      // Emit the items whenever they are updated
      this.items$.next(this.items);
    }
    console.log(this.items);
  }

  getItems() {
    console.log("getItems called");
    return this.items;
  }

  clearCart() {
    if (this.userId) {
      this.items = [];
      localStorage.setItem(
        `cartItems-${this.userId}`,
        JSON.stringify(this.items)
      );
      // Emit the items whenever they are updated
      this.items$.next(this.items);
    }
    return this.items;
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.items = JSON.parse(
      localStorage.getItem(`cartItems-${this.userId}`) || '[]'
    );
    // Emit the items whenever they are updated
    this.items$.next(this.items);
    console.log(userId);
  }

  removeFromCart(product: Product) {
    if (this.userId) {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index > -1) {
    this.items.splice(index, 1);
    localStorage.setItem(
    `cartItems-${this.userId}`,
    JSON.stringify(this.items)
    );
    // Emit the items whenever they are updated
    this.items$.next(this.items);
    }
    }
   }
   
}
