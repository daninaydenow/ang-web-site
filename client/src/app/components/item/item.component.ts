import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() product!: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
  this.cartService.addToCart(product);
  }
}
