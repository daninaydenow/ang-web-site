import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, finalize, merge, mergeAll, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor{

  constructor(private productService: ProductService) { 
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.productService.isLoading.next(true);
    return next.handle(req).pipe(
      tap((event) => {
        if(event instanceof HttpResponse) {
          if(event.status === 200) {
          // this.productService.isLoading.next(false);
          }
        }
      }
      )
    )
  }
}