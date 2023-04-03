import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DatabasesComponent } from './containers/databases/databases.component';
import { DatabasesRoutingModule } from './databases-routing.module';
import { DatabasesService } from './services/databases.service';

@NgModule({
  declarations: [DatabasesComponent],
  imports: [CommonModule, DatabasesRoutingModule, SharedModule],
  providers: [DatabasesService],
})
export class DatabasesModule {}
