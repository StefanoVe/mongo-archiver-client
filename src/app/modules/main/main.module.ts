import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackupsModule } from '../backups/backups.module';
import { CronsModule } from '../crons/crons.module';
import { DatabasesModule } from '../databases/databases.module';
import { SharedModule } from '../shared/shared.module';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './containers/home/home.component';
import { SignoutComponent } from './containers/signout/signout.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [HomeComponent, NavComponent, SignoutComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    BackupsModule,
    DatabasesModule,
    CronsModule,
  ],
})
export class MainModule {}
