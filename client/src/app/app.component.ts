import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
 
  public isLoading$!: Observable<boolean>;
  public title = 'Shop app';
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.isLoading$ = this.productService.getLoading();
  }
  // TODO: 
  // Create a checkout page for cart
  // Create a comment section underneath each product
  // Create a profil page with personal information, shipping address, payment information and so on.
}
