import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BackupsRoutingModule } from './backups-routing.module';
import { BackupService } from './services/backup.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, BackupsRoutingModule],
  providers: [BackupService],
})
export class BackupsModule {}
