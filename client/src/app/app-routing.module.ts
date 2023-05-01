import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutGuard } from './guards/checkout.guard';

import { CartComponent } from './cart/cart/cart.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignOutComponent } from './authentication/sign-out/sign-out.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { OrderPlacedComponent } from './cart/order-placed/order-placed.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { MyOrdersComponent } from './profile/my-orders/my-orders.component';
import { PaymentMethodComponent } from './profile/payment-method/payment-method.component';
import { DeliveryAdressComponent } from './profile/delivery-adress/delivery-adress.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-out',
    component: SignOutComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'my-cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard, CheckoutGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'edit-profile', pathMatch: 'full' },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'delivery-adress',
        component: DeliveryAdressComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'order-placed',
    component: OrderPlacedComponent,
    canActivate: [AuthGuard],
  },
  { path: 'details/:id', component: DetailsComponent },
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
