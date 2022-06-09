import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor() {
    localStorage.clear();
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {}

  getEmailError() {}

  getPasswordError() {}
}
