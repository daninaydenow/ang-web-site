import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  requests: HttpRequest<any>[] = [];

  constructor(private productService: ProductService) {}

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.productService.setLoading(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.productService.setLoading(true);

    return next.handle(req).pipe(finalize(() => this.removeRequest(req)));
  }
}
