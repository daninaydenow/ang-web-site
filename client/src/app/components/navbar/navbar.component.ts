import { Component} from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../authentication/service/authentication.service';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public user$!: Observable<User>;
  public cartItems$!: Observable<Product[]>;
  constructor(private authService: AuthenticationService, private cartService: CartService) {
    this.user$ = this.authService.user$;
    this.cartItems$ = this.cartService.cartList$;
  }
}
