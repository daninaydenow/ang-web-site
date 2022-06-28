import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';

import { ProductsComponent } from './pages/products/products.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

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
    component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
