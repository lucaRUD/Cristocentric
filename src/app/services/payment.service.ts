import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  stripe: Stripe | null = null;

  constructor() {
    this.loadStripe();
  }

  async loadStripe() {
    this.stripe = await loadStripe(
      'pk_test_51NBHeBKtTblp4cBZZ4ptf1mhHApvvxKxLoc8ljAcw6xDN5bnb9OCGxWBKN1Wm1JsA39CmJj9etMCYk4peMqkIPa70072b0aAAC'
    );
  }

  async checkout(amount: number) {
    if (!this.stripe) {
      return;
    }

    const response = await fetch(
      'http://localhost:8000/create-checkout-session/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );
    const data = await response.json();
    const result = await this.stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });
    if (result.error) {
      // handle error
    }
  }
}
