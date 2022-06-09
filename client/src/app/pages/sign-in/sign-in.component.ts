import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    // clear local storage on initialization
    localStorage.clear();
  }

  ngOnInit(): void {}

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

  onSubmit() {
    if (this.form.valid) {
      this.singIn().then((isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['/']);
        } else {
          return;
        }
      });
      // PROMISE.THEN VARIANT
      //
      //
      // this.authService
      //   .signIn(this.form.get('email')?.value, this.form.get('password')?.value)
      //   .then((userCredentials: UserCredential) => {
      //     userCredentials.user
      //       .getIdToken(true)
      //       .then((token) => {
      //         localStorage.setItem(
      //           'user',
      //           JSON.stringify({
      //             email: userCredentials.user.email,
      //             token: token,
      //           })
      //         );
      //       })
      //       .catch((err) => {
      //         alert(err);
      //       });
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
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
      const user = {
        email: userCredentials.user.email,
        token,
      };
      // save user object in local storage
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}