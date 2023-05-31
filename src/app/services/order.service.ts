import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OrderData {
 
  // Define the shape of your order data here
  recipient: {
    name: string;
    address1: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
  };
  items: Array<{
    variant_id: number;
    quantity: number;
    name: string;
    retail_price: string;
    files: Array<{
      url: string;
    }>;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderData) {
     
    return this.http.post('http://127.0.0.1:8000/accounts/orders', orderData);
  }
}
