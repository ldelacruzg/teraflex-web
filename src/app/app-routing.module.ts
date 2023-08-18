import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Apliando la carga perezosa*/
const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'therapist',
    loadChildren: () => import('./therapist/therapist.module').then(m => m.TherapistModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./therapist/modules/home/home.module').then(m => m.HomeModule),
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
