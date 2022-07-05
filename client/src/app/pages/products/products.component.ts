import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<Product[]>;
  constructor(
    private productService: ProductService
  ) {
    this.products$ = this.productService.getAllProducts();
  }

  ngOnInit(): void {}
}
