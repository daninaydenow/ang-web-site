import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Image', 'Description', 'Price', 'Action'];
  dataSource = new MatTableDataSource<Product>([]);
  constructor(private cartService: CartService) { 
    this.cartService.cartList$.subscribe(res => {
      this.dataSource.data = res;
    })
   }

  ngOnInit(): void {
    
  }

  getCartTotal(): string {
    return this.cartService.getTotalPrice();
  }

  removeItemFromCart(product: Product): void {
    this.cartService.removeFromCart(product)
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
