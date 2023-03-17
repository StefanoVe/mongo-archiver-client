import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [SignInComponent, SignInFormComponent],
  imports: [CommonModule, SignInRoutingModule, SharedModule],
})
export class SignInModule {}
