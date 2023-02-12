import { Component } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
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

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });

  onSubmit() {
    // Check for passwords missmatch
    if (
      this.form.get('password')?.value !== this.form.get('rePassword')?.value
    ) {
      alert('Passwords do not match');
      return;
    }
    // If all valid, perform signUp
    if (
      this.form.valid &&
      this.form.get('password')?.value === this.form.get('rePassword')?.value
    ) {
      this.signUp().then((isSuccess) => {
        if (isSuccess) {
          this.authService.setUser(JSON.parse(localStorage.getItem('user')!));
          this.router.navigate(['/']);
        }
      });
    }
  }

  // error extraction method for email control
  getEmailError() {
    if (this.form.get('email')?.hasError('required')) {
      return 'Pease enter an email';
    }
    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }
  // error extraction method for password control
  getPasswordError() {
    if (this.form.get('password')?.hasError('required')) {
      return 'Please enter a password';
    }
    return this.form.get('password')?.hasError('password')
      ? 'Wrong password'
      : '';
  }
  // error extraction method for rePassword control
  getRePasswordError() {
    if (this.form.get('rePassword')?.hasError('required')) {
      return 'Please repeat your password';
    }
    return this.form.get('rePassword')?.hasError('rePassword')
      ? 'Wrong password'
      : '';
  }

  async signUp(): Promise<boolean> {
    try {
      // get user credentials
      const userCredentials: UserCredential = await this.authService.signUp(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      );
      // extract token from credentials
      const token: string = await userCredentials.user.getIdToken(false);
      // create user object
      const user = {
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
      })
      return false;
    }
  }
}
