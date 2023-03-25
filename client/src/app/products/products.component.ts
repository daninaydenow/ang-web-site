import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  private destroy$ = new Subject<void>();
  
  public products$!: Observable<Product[]>;
  public categories$!: Observable<any>;
  
  public filtersForm: FormGroup = this.fb.group({
    category: this.fb.control(''),
    searchTerm: this.fb.control('')
  })

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    this.categories$ = this.productService.getProductCategories();
    
    this.filtersForm.controls['category'].valueChanges.pipe(
      takeUntil(this.destroy$),
      switchMap((category: string) => this.productService.getSpecificCategory(category)),
      tap((products: Product[]) => this.products$ = of(products))
    )
    .subscribe();

    this.filtersForm.controls['searchTerm'].valueChanges.pipe(
      takeUntil(this.destroy$),
      map((value: string) => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((text: string) => this.productService.getSearchResult(text)),
      tap((products: Product[]) => this.products$ = of(products))
    )
    .subscribe();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
