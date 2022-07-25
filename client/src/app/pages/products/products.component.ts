import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public isLoading$!: Observable<boolean>;
  public products$!: Observable<Product[]>;
  public categorySelection: any[] = [
    { category: 'All Products', icon: 'apps' },
    { category: 'Electronics', icon: 'devices' },
    { category: 'Fashion', icon: 'styler' },
    { category: 'Jewelery', icon: 'diamond' },
    { category: 'Beauty', icon: 'local_florist' },
  ];
  constructor(private productService: ProductService) {
    this.isLoading$ = this.productService.isLoading;
    this.products$ = this.productService.getProductsFromTwoCalls();
  }

  getSpecificCategory(category: string): any {
    switch (category) {
      case 'All Products':
        return (this.products$ = this.productService.getProductsFromTwoCalls());
      default:
        return (this.products$ = this.productService.getSpecificCategory(
          category.toLowerCase()
        ));
    }
  }

  getSearchResults(event: any): void {
    this.products$ = of(event.target.value).pipe(
      map((value: string) => value.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text: string) => this.productService.getSearchResult(text))
    );
  }
}
