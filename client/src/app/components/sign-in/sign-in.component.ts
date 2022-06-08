import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  getErrorMessage() {
    return this.form.get('email')?.hasError('email')
      ? 'Wrong email or password'
      : '';
  }

  onSubmit() {
    console.log(this.form.valueChanges);
    console.log(this.form.value);
  }
}
