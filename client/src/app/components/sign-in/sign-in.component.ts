import { Component, OnInit } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private atuhService: AuthenticationService) {
    localStorage.clear();
  }

  ngOnInit(): void {}

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  getEmailError(): string {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter an email';
    }

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

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
      this.atuhService
        .signIn(this.form.get('email')?.value, this.form.get('password')?.value)
        .then((userCredentials: UserCredential) => {
          userCredentials.user
            .getIdToken(true)
            .then((token) => {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  email: userCredentials.user.email,
                  token: token,
                })
              );
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }
}
