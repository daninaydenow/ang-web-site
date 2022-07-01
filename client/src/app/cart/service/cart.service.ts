import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSource = new BehaviorSubject<Product[]>(this.cart)
  cartList$ = this.cartSource.asObservable();
  constructor() { }

  addToCart(product: Product): void {
    const alreadyExist = this.cart.find(x => product.title === x.title);
    if(alreadyExist === undefined) {
      product.quantity = 1;
      product.totalProductPrice = product.price;
      this.cart.push(product);
    }
    if(alreadyExist) {
    alreadyExist.quantity += 1;
    alreadyExist.totalProductPrice = (alreadyExist.quantity * Number(alreadyExist.price)).toFixed(2);
    const index = this.cart.indexOf(alreadyExist);
    this.cart.splice(index, 1, alreadyExist);
    }
    
    this.cartSource.next(this.cart);
  }

  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    this.cart.splice(index, 1);
    this.cartSource.next(this.cart);
  }

  increment(product: Product): void {
    const index = this.cart.indexOf(product);
    this.cart[index].quantity++
    this.cart[index].totalProductPrice = (this.cart[index].quantity * Number(this.cart[index].price)).toFixed(2);
    
  }

  decrement(product: Product): void {
    const index = this.cart.indexOf(product);
    if(this.cart[index].quantity === 1) {
      return
    }
    this.cart[index].quantity--;
    this.cart[index].totalProductPrice = (this.cart[index].quantity * Number(this.cart[index].price)).toFixed(2);
    
  }
  getTotalPrice(): string {
    let totalPrice: number = 0;
    this.cart.forEach(x => totalPrice += Number(x.totalProductPrice))
    return totalPrice.toFixed(2);
  }
  
}
