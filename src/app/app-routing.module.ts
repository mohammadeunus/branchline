import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./features/people/people.module').then(m => m.PeopleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'hiring',
    loadChildren: () => import('./features/hiring/hiring.module').then(m => m.HiringModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    loadChildren: () => import('./features/devices/devices.module').then(m => m.DevicesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apps',
    loadChildren: () => import('./features/apps/apps.module').then(m => m.AppsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: undefined
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }