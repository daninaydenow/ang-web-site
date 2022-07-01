import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared/shared.module';

import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CartModule { }
