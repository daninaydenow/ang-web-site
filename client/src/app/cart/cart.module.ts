import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [
    SharedModule
  ]
})
export class CartModule { }
