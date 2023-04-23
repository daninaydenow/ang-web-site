import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Observable, tap, takeUntil, Subject, take } from 'rxjs';

import { Product } from 'src/app/products/models/Product';
import { CartService } from '../service/cart.service';
import { CheckoutService } from '../service/checkout.service';
import { CheckoutForm } from '../models/CheckoutForm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  products$!: Observable<Product[]>;
  checkoutForm = this.fb.group({
    userData: this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
    }),
    userAdress: this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
    }),
    payment: this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with state if there is any...
    // Else init empty form ...
    this.checkoutService
      .getCheckoutFormState()
      .pipe(
        take(1),
        tap((formState: CheckoutForm) => this.initForm(formState))
      )
      .subscribe();
    // Save form state on valueChange...
    this.checkoutForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((formState: CheckoutForm) =>
          this.checkoutService.setCheckoutFormState(formState)
        )
      )
      .subscribe();
    this.products$ = this.cartService.getCartList();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
  }

  placeOrder(): void {
    this.cartService.clearCart();
    this.router.navigate(['order-placed']);
  }

  getCartTotal(): string {
    return this.cartService.getTotalPrice();
  }

  getUserDataControl(): AbstractControl | null {
    return this.checkoutForm.get('userData');
  }

  getUserAdressControl(): AbstractControl | null {
    return this.checkoutForm.get('userAdress');
  }

  getPaymentControl(): AbstractControl | null {
    return this.checkoutForm.get('payment');
  }

  private initForm(formState: CheckoutForm): void {
    this.checkoutForm = this.fb.group({
      userData: this.fb.group({
        name: [formState.userData.name, Validators.required],
        phoneNumber: [formState.userData.phoneNumber, Validators.required],
        email: [formState.userData.email, Validators.required],
      }),
      userAdress: this.fb.group({
        country: [formState.userAdress.country, Validators.required],
        city: [formState.userAdress.city, Validators.required],
        street: [formState.userAdress.street, Validators.required],
        streetNumber: [formState.userAdress.streetNumber, Validators.required],
      }),
      payment: this.fb.group({
        cardNumber: [formState.payment.cardNumber, Validators.required],
        expirationDate: [formState.payment.expirationDate, Validators.required],
        cvv: [formState.payment.cvv, Validators.required],
      }),
    });
  }
}
