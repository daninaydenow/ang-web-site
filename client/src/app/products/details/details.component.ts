import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap, Observable, tap} from 'rxjs';
import { CartService } from 'src/app/cart/service/cart.service';

import { Product } from 'src/app/products/models/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product$!: Observable<Product>;
  mainImage!: string;
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) => 
        this.productService.getProduct(Number(params.get('id'))
        ).pipe(
          tap((product: Product) => this.mainImage = product.thumbnail)
        )
      )
    )
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }

}
