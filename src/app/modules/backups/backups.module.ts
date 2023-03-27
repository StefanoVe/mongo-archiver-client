import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { BackupsRoutingModule } from './backups-routing.module';
import { BackupService } from './services/backup.service';
import { BackupsComponent } from './services/containers/backups/backups.component';

@NgModule({
  declarations: [BackupsComponent],
  imports: [CommonModule, BackupsRoutingModule, SharedModule],
  providers: [BackupService],
})
export class BackupsModule {}
