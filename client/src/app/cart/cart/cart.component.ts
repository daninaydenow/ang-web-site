import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  displayedColumns: string[] = ['Name', 'Image', 'Description', 'Quantity', 'Price', 'Action'];
  dataSource = new MatTableDataSource<Product>([]);
  constructor(private cartService: CartService) { 
    this.cartService.getCartList().subscribe(res => {
      this.dataSource.data = res;
    })
   }

  getCartTotal(): string {
    return this.cartService.getTotalPrice();
  }

  removeItemFromCart(product: Product): void {
    this.cartService.removeFromCart(product)
  }

  incrementItemQuantity(product: Product): void {
    this.cartService.increment(product);
  }

  decrementItemQuantity(product: Product): void {
    this.cartService.decrement(product);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
