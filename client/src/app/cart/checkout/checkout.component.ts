import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';

import {
  Observable,
  tap,
  Subject,
  take,
  switchMap,
  map,
  combineLatest,
  catchError,
  throwError,
} from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Product } from 'src/app/products/models/Product';
import { CheckoutForm } from '../models/CheckoutForm';
import { Adress } from 'src/app/profile/model/Adress.model';
import { PaymentMethod } from 'src/app/profile/model/paymentMethod.model';
import { CartService } from '../service/cart.service';
import { UserService } from 'src/app/profile/services/user.service';
import { PaymentMethodService } from 'src/app/profile/services/payment-method.service';

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
  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private readonly snackBarSettings: MatSnackBarConfig = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 5000,
  };
  private readonly destroy$ = new Subject();
  products$!: Observable<Product[]>;
  checkoutForm = this.fb.group({
    userData: this.fb.group({
      name: ['', Validators.required],
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
    private userService: UserService,
    private paymentMethodService: PaymentMethodService,
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.userService.getUserAdress(),
      this.paymentMethodService.getCurrentlyUsedPaymentMethod().pipe(
        switchMap((currentlyUsed: { currentlyUsed: string }) => {
          return this.paymentMethodService
            .getUserPaymentMethods()
            .pipe(
              map((paymentMethods: PaymentMethod[]) =>
                paymentMethods.find(
                  (method) => method.id === currentlyUsed.currentlyUsed
                )
              )
            );
        })
      ),
    ])
      .pipe(
        catchError((error) => {
          this.snackBar.open(error, 'close', this.snackBarSettings);
          return throwError(() => error);
        }),
        take(1),
        tap(([adress, paymentMethod]: [Adress, PaymentMethod | undefined]) =>
          this.initForm({
            userData: {
              name: this.auth.currentUser?.displayName || '',
              email: this.auth.currentUser?.email || '',
            },
            userAdress: adress,
            payment: paymentMethod!,
          })
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
