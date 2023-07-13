import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Apliando la carga perezosa*/
const routes: Routes = [
  {
    path: 'therapist',
    loadChildren:() => import('./therapist/therapist.module').then(m=>m.TherapistModule)
  },
  { 
    path: '', 
    redirectTo: '/therapist/auth/login', 
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
