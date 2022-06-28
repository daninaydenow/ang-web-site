import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList!: Product[];
  constructor() { }

  addToCart(item: Product) {
    
  }
}
