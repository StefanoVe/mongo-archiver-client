import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CronsRoutingModule } from './crons-routing.module';
import { CronsService } from './services/cron.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, CronsRoutingModule],
  providers: [CronsService],
})
export class CronsModule {}
