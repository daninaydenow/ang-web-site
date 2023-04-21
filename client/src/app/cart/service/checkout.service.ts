import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutForm } from '../models/CheckoutForm';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  checkoutFormState = new BehaviorSubject<CheckoutForm>({
    userData: {
      name: '',
      phoneNumber: '',
      email: '',
    },
    userAdress: {
      country: '',
      city: '',
      street: '',
      streetNumber: '',
    },
    payment: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });
  constructor() {}

  getCheckoutFormState(): Observable<CheckoutForm> {
    return this.checkoutFormState.asObservable();
  }

  setCheckoutFormState(formState: CheckoutForm): void {
    this.checkoutFormState.next(formState);
  }
}
