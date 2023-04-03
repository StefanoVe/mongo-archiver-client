import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { BackupsRoutingModule } from './backups-routing.module';
import { BackupsComponent } from './containers/backups/backups.component';
import { BackupService } from './services/backup.service';

@NgModule({
  declarations: [BackupsComponent],
  imports: [CommonModule, BackupsRoutingModule, SharedModule],
  providers: [BackupService],
})
export class BackupsModule {}
