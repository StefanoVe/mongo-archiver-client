import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { DatabaseFormComponent } from './components/database-form/database-form.component';
import { AddComponent } from './containers/add/add.component';
import { DatabasesComponent } from './containers/databases/databases.component';
import { DatabasesRoutingModule } from './databases-routing.module';
import { DatabasesService } from './services/databases.service';

@NgModule({
  declarations: [DatabasesComponent, AddComponent, DatabaseFormComponent],
  imports: [
    CommonModule,
    DatabasesRoutingModule,
    SharedModule,
    TailwindFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatabasesService],
})
export class DatabasesModule {}
