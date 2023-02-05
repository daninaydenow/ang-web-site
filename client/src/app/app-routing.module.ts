import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { CartComponent } from './cart/cart/cart.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignOutComponent } from './authentication/sign-out/sign-out.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';

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
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my-cart', 
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  { path: 'details/:id',
    component: DetailsComponent
  },
  {path: '**',
   redirectTo: '', 
   component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
