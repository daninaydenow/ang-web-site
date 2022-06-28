import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Image', 'Description', 'Price'];
  dataSource = new MatTableDataSource<Product>([]);
  constructor(private productService: ProductService) { 
    this.productService.getAllProducts().subscribe(res => {
      this.dataSource.data = res;
    })
    
   }

  ngOnInit(): void {
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
