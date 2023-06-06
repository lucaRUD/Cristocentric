import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OrderData } from 'src/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderDataSource = new BehaviorSubject<OrderData | null>(null);
  orderData$ = this.orderDataSource.asObservable();

  constructor(private http: HttpClient) {
    // Retrieve the orderData object from local storage
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      this.orderDataSource.next(JSON.parse(storedOrderData));
    }
    console.log(this.orderData$);
  }

  updateOrderData(orderData: OrderData) {
    // Update the value of the orderDataSource BehaviorSubject
    this.orderDataSource.next(orderData);

    // Store the orderData object in local storage
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }

  createOrder(orderData: OrderData) {
    return this.http.post('http://127.0.0.1:8000/accounts/orders/', orderData);
  }
}
