import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/products/models/Product';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public displayedColumns: string[] = [
    'Name',
    'Image',
    'Description',
    'Quantity',
    'Price',
    'Action',
  ];
  public dataSource = new MatTableDataSource<Product>([]);

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService
      .getCartList()
      .pipe(
        takeUntil(this.destroy$),
        tap((products: Product[]) => {
          this.dataSource.data = products;
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getCartTotal(): string {
    return this.cartService.getTotalPrice();
  }

  removeItemFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
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
