import {
  Component,
  Input,
} from '@angular/core';
import { Product } from 'src/app/products/models/Product';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() products!: Product[];
  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
