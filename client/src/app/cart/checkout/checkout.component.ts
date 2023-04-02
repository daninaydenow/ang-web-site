import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/products/models/Product';
import { CartService } from '../service/cart.service';
import { Observable, tap, takeUntil, Subject } from 'rxjs';
import { CheckoutService } from '../service/checkout.service';
import { CheckoutForm } from '../models/CheckoutForm';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  private readonly destroy$ = new Subject();
  products$!: Observable<Product[]>;
  userDataFormGroup = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
  });

  userAdressFormGroup = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    streetNumber: ['', Validators.required],
  });

  paymentFormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expirationDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkoutService
      .getCheckoutFormState()
      .pipe(
        takeUntil(this.destroy$),
        tap((formState: CheckoutForm) => {
          this.initForm(formState);
        })
      )
      .subscribe();
    // this.checkoutFormGroup.valueChanges
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     tap((values: CheckoutForm) => {
    //       this.checkoutService.setCheckoutFormState({ ...values });
    //     })
    //   )
    //   .subscribe();
    this.products$ = this.cartService.getCartList();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
  }

  getCartTotal(): string {
    return this.cartService.getTotalPrice();
  }

  initForm(formState?: CheckoutForm): void {
    this.userDataFormGroup = this.fb.group({
      name: [formState?.name, Validators.required],
      phoneNumber: [formState?.phoneNumber, Validators.required],
      email: [formState?.email, Validators.required],
    });

    this.userAdressFormGroup = this.fb.group({
      country: [formState?.country, Validators.required],
      city: [formState?.city, Validators.required],
      street: [formState?.street, Validators.required],
      streetNumber: [formState?.streetNumber, Validators.required],
    });

    this.paymentFormGroup = this.fb.group({
      cardNumber: [formState?.cardNumber, Validators.required],
      expirationDate: [formState?.expirationDate, Validators.required],
      cvv: [formState?.cvv, Validators.required],
    });
  }

  submit(): void {
    this.snackBar.open('Your order has been placed!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: 'successful-order',
    });
  }
}
