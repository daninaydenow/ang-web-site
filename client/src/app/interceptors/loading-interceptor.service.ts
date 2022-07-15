import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, finalize, map, merge, mergeAll, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor{

  constructor(private productService: ProductService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.productService.isLoading.next(true);
    return next.handle(req).pipe(
      // tap((res) => of(res).pipe(switchMap(second => of(second)))),
      // tap(() => this.productService.isLoading.next(false))
    )
  }
}