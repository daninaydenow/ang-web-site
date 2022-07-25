import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  delay,
  finalize,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private productService: ProductService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.productService.isLoading.next(true);
    return next.handle(req).pipe(
      map((res) => {
        if (res instanceof HttpResponse) {
          if (res.status === 200) {
            this.productService.isLoading.next(false);
          } else {
            this.productService.isLoading.next(true);
          }
        }
        return res;
      })
    );
  }
}
