import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from '../services/payment-method.service';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../model/paymentMethod.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit {
  private readonly snackBarSettings: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: 5000,
  };
  paymentMethods$!: Observable<PaymentMethod[]>;
  currentlyUsed$!: Observable<DocumentData>;
  paymentMethodForm!: FormGroup;
  showCvv = {
    id: '',
    show: false,
  };
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paymentMethodForm = this.initForm();
    this.paymentMethods$ = this.paymentMethodService.getUserPaymentMethods();
    this.currentlyUsed$ =
      this.paymentMethodService.getCurrentlyUsedPaymentMethod();
  }

  showCardCvv(id: string): void {
    this.showCvv.show = !this.showCvv.show;
    this.showCvv.id = id;
  }

  deleteCard(id: string): void {
    this.paymentMethodService.deleteCard(id);
  }

  createCard(): void {
    if (this.paymentMethodForm.valid) {
      this.paymentMethodService
        .addCard(this.paymentMethodForm.value)
        .then(() => {
          this.paymentMethodForm.reset();
        })
        .catch((error) =>
          this.snackBar.open(error.message, '', this.snackBarSettings)
        );
    }
  }

  changeCurrentlyUsed(cardId: string) {
    this.paymentMethodService
      .changeCurrentlyUsedPaymentMethod(cardId)
      .then((res) =>
        this.snackBar.open(
          "You've successfully changed your payment method!",
          'close',
          { ...this.snackBarSettings, panelClass: 'success' }
        )
      )
      .catch((error) => {
        this.snackBar.open(error.message, 'close', this.snackBarSettings);
      });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      cardNumber: this.fb.control('', [
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      expirationDate: this.fb.control(''),
      cvv: this.fb.control('', [
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
    });
  }
}
