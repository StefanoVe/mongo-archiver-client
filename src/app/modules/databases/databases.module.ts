import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatabasesRoutingModule } from './databases-routing.module';
import { DatabasesService } from './services/databases.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DatabasesRoutingModule],
  providers: [DatabasesService],
})
export class DatabasesModule {}
