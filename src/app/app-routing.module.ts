import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedGuard } from './guards/connected.guard';
import { SigninGuard } from './guards/signin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    canActivate: [ConnectedGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./modules/sign-in/sign-in.module').then((m) => m.SignInModule),
    canActivate: [SigninGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
