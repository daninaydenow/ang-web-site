import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }
