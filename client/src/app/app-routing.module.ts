import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
