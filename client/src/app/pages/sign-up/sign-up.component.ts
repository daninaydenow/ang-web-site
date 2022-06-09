import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthenticationService) {
    localStorage.clear();
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.signUp();
    }
  }

  getEmailError() {
    if (this.form.get('email')?.hasError('required')) {
      return 'Pease enter an email';
    }
    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordError() {}

  async signUp() {
    try {
    } catch (error) {
      alert(error);
    }
  }
}
