import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/Product';
import { AuthenticationService } from '../../authentication/service/authentication.service';
import { CartService } from '../../cart/service/cart.service';
import { IUser } from 'src/app/authentication/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public user$!: Observable<IUser>;
  public cartItems$!: Observable<Product[]>;
  constructor(
    private authService: AuthenticationService,
    private cartService: CartService
  ) {
    this.user$ = this.authService.getUser();
    this.cartItems$ = this.cartService.getCartList();
  }
}
