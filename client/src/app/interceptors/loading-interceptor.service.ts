import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  finalize,
  Observable,
} from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  requests: HttpRequest<any>[] = [];

  constructor(private productService: ProductService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    setTimeout(() => {
      this.productService.setLoading(true);
    }, 0)
   
    return next.handle(req).pipe(
      finalize(() => {
         this.requests.shift();
         if(this.isLastRequest()) {
            return this.productService.setLoading(false);
         }
      })
    );
  }

  isLastRequest(): boolean {
     return this.requests.length <= 0;
  }
}
