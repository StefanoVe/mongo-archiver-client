import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './containers/home/home.component';
import { SignoutComponent } from './containers/signout/signout.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [HomeComponent, NavComponent, SignoutComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
