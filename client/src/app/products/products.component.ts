import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private searchTerm$ = new Subject<string>();
  private destroy$ = new Subject<void>();
 
  public products$!: Observable<Product[]>;
  public categories$!: Observable<any>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    this.categories$ = this.productService.getProductCategories();

    this.searchTerm$.asObservable().pipe(
      takeUntil(this.destroy$),
      map((value: string) => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((text: string) => this.productService.getSearchResult(text)),
      tap((res: Product[]) => this.products$ = of(res))
    ).subscribe();

  }

  getSpecificCategories(event: MatSelectChange): void {
    this.products$ = this.productService.getSpecificCategory(event.value);
  }

  getSearchResults(event: any): void {
    this.searchTerm$.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
