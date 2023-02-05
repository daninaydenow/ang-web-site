import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  map,
  Subject,
} from 'rxjs';
import { Product } from '../products/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'https://dummyjson.com';
  private isLoading = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoading(value: boolean): void {
    this.isLoading.next(value);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?limit=0`).pipe(map((res: any) => res.products));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getProductCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/categories`);
  }

  getSpecificCategory(category: string): Observable<Product[]> {
    if(category === 'none') {
      return this.getAllProducts();
    }
    return this.http.get<Product[]>(`https://dummyjson.com/products/category/${category}`).pipe(map((res: any) => res.products));
  }

  getSearchResult(searchInput: string): Observable<Product[]> {
    if (searchInput.length === 0) {
      return this.getAllProducts();
    }
    return this.http.get<Product[]>(`https://dummyjson.com/products/search?q=${searchInput}`).pipe(map((res: any) => res.products));
  }
}
