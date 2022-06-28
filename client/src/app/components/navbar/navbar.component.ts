import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: User;
  subscribtion!: Subscription;
  cartItemsCount!: number;
  constructor(private authService: AuthenticationService, private cartService: CartService) {
    this.subscribtion = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.cartService.cartList$.subscribe(res => {
      this.cartItemsCount = res.length;
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
