import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  user!: User;
  products!: Product[];
  subscribtion!: Subscription;
  constructor(
    private authService: AuthenticationService,
    private productService: ProductService
  ) {
    this.subscribtion = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
