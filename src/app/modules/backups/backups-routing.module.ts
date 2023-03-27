import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupsComponent } from './services/containers/backups/backups.component';

const routes: Routes = [
  {
    path: 'browse',
    component: BackupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackupsRoutingModule {}
