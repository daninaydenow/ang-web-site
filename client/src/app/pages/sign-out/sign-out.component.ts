import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .signOut()
      .then(() => {
        localStorage.clear();
        this.authService.getLocalStorageUser();
        this.router.navigate(['/sign-in']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
