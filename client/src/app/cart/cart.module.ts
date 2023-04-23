import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent, OrderPlacedComponent],
  imports: [SharedModule],
})
export class CartModule {}
