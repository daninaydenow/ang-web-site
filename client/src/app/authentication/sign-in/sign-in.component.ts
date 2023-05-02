import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { IUser } from 'src/app/authentication/models/User';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    // clear local storage on initialization
    localStorage.clear();
  }

  // create form model with needed controls
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // error extraction method for email control
  getEmailError(): string {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter an email';
    }

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  // error extraction method for password control
  getPasswordError(): string {
    if (this.form.get('password')?.hasError('required')) {
      return 'You must enter a password';
    }

    return this.form.get('password')?.hasError('password')
      ? 'Not a valid password'
      : '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.singIn().then((isSuccess) => {
        if (isSuccess) {
          this.authService.setUser(JSON.parse(localStorage.getItem('user')!));
          this.router.navigate(['/']);
        }
      });
    }
  }

  async singIn(): Promise<boolean> {
    try {
      // get user credentials
      const userCredentials: UserCredential = await this.authService.signIn(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      );
      // extract token from credentials
      const token: string = await userCredentials.user.getIdToken(false);
      // create user object
      const user: IUser = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        token,
      };
      // save user object in local storage
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error: any) {
      this.snackbar.open(error.message, 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
      return false;
    }
  }
}
