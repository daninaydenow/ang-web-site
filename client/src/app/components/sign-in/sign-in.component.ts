import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor() {}

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
    console.log(this.form);
  }
}
