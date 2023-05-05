import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutForm } from '../models/CheckoutForm';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private initialLoad = true;
  checkoutFormState = new BehaviorSubject<CheckoutForm>({
    userData: {
      name: '',
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

  isInitialLoad(): boolean {
    return this.initialLoad;
  }

  setInitialLoad(value: boolean): void {
    this.initialLoad = value;
  }

  getCheckoutFormState(): Observable<CheckoutForm> {
    return this.checkoutFormState.asObservable();
  }

  setCheckoutFormState(formState: CheckoutForm): void {
    this.checkoutFormState.next(formState);
  }
}
