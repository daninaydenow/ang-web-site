import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() product!: Product;
  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
  this.cartService.addToCart(product);
  }
}
