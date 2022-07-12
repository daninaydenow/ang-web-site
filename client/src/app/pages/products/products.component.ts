import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
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
export class ProductsComponent implements AfterViewInit {
  @ViewChild('productSearchInput', { static:true })
  productSearchInput!: ElementRef;
  public isLoading$!: Observable<boolean>;
  public categorySelection: any[] = [
    { category: 'All Products', icon: 'apps' },
    { category: 'Electronics', icon: 'devices' },
    { category: 'Fashion', icon: 'styler' },
    { category: 'Jewelery', icon: 'diamond' },
    { category: 'Beauty', icon: 'local_florist' },
  ];
  public products$!: Observable<Product[]>;
  public searchObs$!: Observable<string>;
  constructor(private productService: ProductService) {
    this.isLoading$ = this.productService.isLoading;
    this.products$ = this.productService.getProductsFromTwoCalls();
    this.products$.pipe(tap(console.log))
  }

  getSpecificCategory(category: string) :any {
     switch(category) {
      case "All Products": return this.products$ = this.productService.getProductsFromTwoCalls(); 
      default: return this.products$ = this.productService.getSpecificCategory(category.toLowerCase());
     }
  }


  ngAfterViewInit(): void {
    const searchObs = fromEvent(this.productSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value.trim()),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string) => text),
        tap(console.log)
      ).subscribe()
      // .subscribe((searchText: string) => {
      //   this.productService
      //     .getSearchResult(searchText)
      //     .subscribe((result: Product[]) => {
      //      this.products$ = of(result);
      //     });
      // });
  }
}
