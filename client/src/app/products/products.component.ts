import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  tap,
  of,
  switchMap,
  takeUntil,
  Subject
} from 'rxjs';
import { Product } from 'src/app/products/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private searchTerm$ = new Subject<string>();
  private destroy$ = new Subject<void>();
  public isLoading$!: Observable<boolean>;
  public products$!: Observable<Product[]>;
  public categorySelection: any[] = [
    { category: 'All Products', icon: 'apps' },
    { category: 'Electronics', icon: 'devices' },
    { category: 'Fashion', icon: 'styler' },
    { category: 'Jewelery', icon: 'diamond' },
    { category: 'Beauty', icon: 'local_florist' },
  ];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading$ = this.productService.getLoading();
    this.products$ = this.productService.getAllProducts();
    this.searchTerm$.asObservable().pipe(
      takeUntil(this.destroy$),
      map((value: string) => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((text: string) => this.productService.getSearchResult(text)),
      tap((res: Product[]) => this.products$ = of(res))
    ).subscribe();
  }

  getSpecificCategory(category: string): any {
    switch (category) {
      case 'All Products':
        return (this.products$ = this.productService.getAllProducts());
      default:
        return (this.products$ = this.productService.getSpecificCategory(
          category.toLowerCase()
        ));
    }
  }

  getSearchResults(event: any): void {
    this.searchTerm$.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
