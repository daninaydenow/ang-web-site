import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  forkJoin,
  Observable,
  map,
  tap,
  mergeMap,
  pipe,
  switchMap,
  zip,
  of,
  BehaviorSubject,
} from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'https://fakestoreapi.com';
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient) {}

  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.baseUrl}/products`);
  // }

  getProductsFromTwoCalls(): Observable<Product[]> {
    return forkJoin([
      this.http.get(`${this.baseUrl}/products`),
      this.http.get('https://dummyjson.com/products'),
    ]).pipe(
      map(([firstApi, secondApi]: any) =>
        [...firstApi, ...secondApi.products].map((x: Product | any) => this.compileObject(x))
      )
    );
  }

  getSpecificCategory(category: string): Observable<Product[]> {
    return zip([
      this.http.get(`${this.baseUrl}/products/category/${category}`),
      this.http.get(`https://dummyjson.com/products/category/${category}`),
    ]).pipe(
      map(([firstApi, secondApi]: any) =>
        [...firstApi, ...secondApi.products].map((x: Product | any) => this.compileObject(x))
      )
    );
  }

  getSearchResult(searchInput: string) :Observable<Product[]>  {
    if(searchInput.length === 0) {
      return this.getProductsFromTwoCalls();
    }
    return this.http
    .get<Product[]>(`https://dummyjson.com/products/search?q=${searchInput}`)
    .pipe(switchMap((firstApi: any) => 
               this.http.get('https://fakestoreapi.com/products/category/electronics')
              .pipe(map((secondApi: any) => {
                  return [...firstApi.products, ...secondApi].map((x: Product | any) => this.compileObject(x))
              }))
    ))
  }

  // getProductsFromTwoCallsZip(): Observable<Product[]> {
  //   return zip(
  //     this.http.get(`${this.baseUrl}/products`),
  //     this.http.get('https://dummyjson.com/products')
  //   ).pipe(
  //     map(([firstApi, secondApi]: any) =>
  //       [...firstApi, ...secondApi.products].map((x: Product | any) => this.compileObject(x))
  //     )
  //   );
  // }

  compileObject(x: any): any {
    return {
      id: x.id,
      title: x.title,
      description: x.description,
      image: x.image ? x.image : x.thumbnail,
      price: x.price,
      category: x.category,
      stock: x.stock ? x.stock : 100,
      rating: x.rating.rate ? x.rating.rate : x.rating,
      quantity: 1,
      totalProductPrice: x.price,
    };
  }
}
