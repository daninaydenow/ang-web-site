import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService
      .signOut()
      .then(() => {
        // clear local storage
        localStorage.clear();
        // navigate to sign in page
        this.router.navigate(['/sign-in']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
