import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSource = new BehaviorSubject<Product[]>(this.cart)
  cartList$ = this.cartSource.asObservable();
  constructor() { }

  addToCart(product: Product): void {
    this.cart.push(product)
    this.cartSource.next(this.cart);
  }

  removeFromCart(product: Product, index: number): void {
    this.cart.splice(index, 1);
    this.cartSource.next(this.cart);
  }
}
