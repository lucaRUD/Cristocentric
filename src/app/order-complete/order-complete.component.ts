import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css'],
})
export class OrderCompleteComponent implements OnInit {
  orderDataSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Extract the sessionId from the URL
    const sessionId = this.route.snapshot.queryParamMap.get('sessionId');

    // Use the sessionId to retrieve information about the completed checkout session from Stripe
    // ...

    // Subscribe to the orderData$ BehaviorSubject of the OrderService
    this.orderDataSubscription = this.orderService.orderData$.subscribe(
      (orderData) => {
        // Check if the value emitted by the orderData$ observable is not null
        if (orderData) {
          // Log the value of the orderData object
          console.log('Order data:', orderData);

          // Create an order using the Prodigi API
          this.orderService.createOrder(orderData).subscribe((response) => {
            // Handle the response from the Prodigi API
            console.log('Order created:', response);

            // Empty the cart
            this.cartService.clearCart();
          });

          // Unsubscribe from the orderData$ BehaviorSubject of the OrderService
          if (this.orderDataSubscription) {
            this.orderDataSubscription.unsubscribe();
          }
        }
      }
    );
  }
}
