import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from './shared-components/guards/permissions.guard';

/*Apliando la carga perezosa*/
const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'therapist', canActivate:[PermissionsGuard],
    loadChildren: () => import('./therapist/therapist.module').then(m => m.TherapistModule)
  },
  {
    path: 'home', canActivate:[PermissionsGuard],
    loadChildren: () => import('./therapist/modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'admin', canActivate:[PermissionsGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'home-admin', canActivate:[PermissionsGuard],
    loadChildren: () => import('./admin/modules/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: '', 
    redirectTo: 'authentication/security/login', // Ruta relativa
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
