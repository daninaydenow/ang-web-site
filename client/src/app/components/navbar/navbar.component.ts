import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: User;
  subscribtion!: Subscription;
  constructor(private authService: AuthenticationService) {
    this.subscribtion = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
