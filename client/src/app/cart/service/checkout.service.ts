import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutForm } from '../models/CheckoutForm';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  checkoutFormState = new BehaviorSubject<CheckoutForm>({
    name: '',
    phoneNumber: '',
    email: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  constructor() {}

  getCheckoutFormState(): Observable<CheckoutForm> {
    return this.checkoutFormState.asObservable();
  }

  setCheckoutFormState(formState: CheckoutForm): void {
    this.checkoutFormState.next(formState);
  }
}
