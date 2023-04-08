import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CronsComponent } from './containers/crons/crons.component';
import { CronsRoutingModule } from './crons-routing.module';
import { CronsService } from './services/cron.service';

@NgModule({
  declarations: [CronsComponent],
  imports: [CommonModule, CronsRoutingModule, SharedModule],
  providers: [CronsService],
})
export class CronsModule {}
