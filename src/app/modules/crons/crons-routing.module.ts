import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronsComponent } from './containers/crons/crons.component';

const routes: Routes = [
  {
    path: 'browse',
    component: CronsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronsRoutingModule {}
