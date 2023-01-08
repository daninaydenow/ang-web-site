import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [CartComponent],
  imports: [
    SharedModule
  ]
})
export class CartModule { }
