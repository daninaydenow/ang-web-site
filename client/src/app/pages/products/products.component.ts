import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  of,
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
  @ViewChild('productSearchInput', { static: true })
  productSearchInput!: ElementRef;
  public products$!: Observable<Product[]>;
  public searchObs$!: Observable<string>;
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProductsFromTwoCalls();
  }

  ngAfterViewInit(): void {
    fromEvent(this.productSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value.trim()),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchText: string) => {
        this.productService
          .getSearchResult(searchText)
          .subscribe((searchResult: Product[]) => {
            if(searchResult.length !== 0) {
              return this.products$ = of(searchResult)
            } else  {
              return this.products$ = this.productService.getProductsFromTwoCalls();
            }
          });
      });
  }
}
