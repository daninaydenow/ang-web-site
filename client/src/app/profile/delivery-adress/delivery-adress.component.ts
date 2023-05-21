import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, tap, takeUntil, take } from 'rxjs';
import { UserService } from '../services/user.service';
import { Adress } from '../model/Adress.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delivery-adress',
  templateUrl: './delivery-adress.component.html',
  styleUrls: ['./delivery-adress.component.css'],
})
export class DeliveryAdressComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  private readonly snackBarSettings: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: 5000,
  };
  userAdressForm: FormGroup = this.initForm();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserAdress()
      .pipe(
        tap((adress: Adress) => (this.userAdressForm = this.initForm(adress))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
  }

  updateAdress(): void {
    this.userService
      .updateADress(this.userAdressForm.value)
      .pipe(
        tap(() =>
          this.snackBar.open(
            "You've successfully updated your delivery adress!",
            'close',
            { ...this.snackBarSettings, panelClass: 'success' }
          )
        ),
        take(1)
      )
      .subscribe();
  }

  private initForm(formState?: Adress): FormGroup {
    return this.fb.group({
      country: [formState?.country || '', Validators.required],
      city: [formState?.city || '', Validators.required],
      street: [formState?.street || '', Validators.required],
      streetNumber: [formState?.streetNumber || '', Validators.required],
    });
  }
}
