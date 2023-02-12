import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../products/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSource = new BehaviorSubject<Product[]>(this.cart);

  constructor() { }

  getCartList(): Observable<Product[]> {
    return this.cartSource.asObservable();
  }

  addToCart(product: Product): void {
    const alreadyExist = this.cart.find(x => product.id === x.id);
    if(!alreadyExist) {
      this.cart.push({...product, quantity: 1, totalProductPrice: product.price});
    }
    if(alreadyExist) {
    alreadyExist.quantity! += 1;
    alreadyExist.totalProductPrice = (alreadyExist.quantity! * Number(alreadyExist.price)).toFixed(2);
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
    this.cart = this.cart.map(x => {
      if(x.id === product.id) {
         return {...x, 
         quantity: x.quantity! += 1, 
         totalProductPrice: (x.quantity! * Number(x.price)).toFixed(2)
         };
      }
      return x;
    });
    this.cartSource.next(this.cart);
  }

  decrement(product: Product): void {
    this.cart = this.cart.map(x => {
      if(x.id === product.id) {
        if(x.quantity === 1) {
          return x;
        }
        return {...x, 
          quantity: x.quantity! -= 1, 
          totalProductPrice: (x.quantity! * Number(x.price)).toFixed(2)
        };
      }
      return x;
    });
    this.cartSource.next(this.cart);
  }

  getTotalPrice(): string {
    return this.cart.reduce((acc: number, curr: Product) => acc + Number(curr.totalProductPrice) , 0).toFixed(2);
  }
  
}
