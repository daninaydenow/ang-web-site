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
    this.cart = this.cart.filter(obj => obj !== product);
    this.cartSource.next(this.cart);
  }

  increment(product: Product): void {
    const newCart = this.cart.map(x => {
      if(x.id === product.id) {
         return {...x, quantity: x.quantity += 1 , totalProductPrice: (x.quantity * Number(x.price)).toFixed(2)};
      }
      return x;
    });
    this.cartSource.next(newCart);
    this.cart = [...newCart];
  }

  decrement(product: Product): void {
    const newCart = this.cart.map(x => {
      if(x.id === product.id) {
        if(x.quantity === 1) {
          return x;
        }
        return {...x, quantity: x.quantity -= 1, totalProductPrice: (x.quantity * Number(x.price)).toFixed(2)};
      }
      return x;
    });
    this.cartSource.next(newCart);
    this.cart = [...newCart];
  }
  getTotalPrice(): string {
    let totalPrice: number = 0;
    this.cart.map(x => totalPrice += Number(x.totalProductPrice))
    return totalPrice.toFixed(2);
  }
  
}
