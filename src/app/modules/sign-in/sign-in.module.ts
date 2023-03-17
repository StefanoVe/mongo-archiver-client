import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  declarations: [SignInComponent, SignInFormComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    SharedModule,
    TailwindFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignInModule {}
