import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './containers/add/add.component';
import { DatabasesComponent } from './containers/databases/databases.component';

const routes: Routes = [
  {
    path: 'browse',
    component: DatabasesComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabasesRoutingModule {}
