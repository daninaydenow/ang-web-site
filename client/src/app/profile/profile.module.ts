import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { DeliveryAdressComponent } from './delivery-adress/delivery-adress.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    MyOrdersComponent,
    PaymentMethodComponent,
    DeliveryAdressComponent,
  ],
  imports: [SharedModule],
})
export class ProfileModule {}
