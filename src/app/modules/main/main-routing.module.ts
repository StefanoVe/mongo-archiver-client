import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedGuard } from 'src/app/guards/connected.guard';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './containers/home/home.component';
import { SignoutComponent } from './containers/signout/signout.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'signout',
        component: SignoutComponent,
      },
      // {
      //   path: 'databases',
      //   component: NavComponent,
      // },
      {
        path: 'backups',
        canActivate: [ConnectedGuard],
        loadChildren: () =>
          import('../backups/backups.module').then((m) => m.BackupsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
