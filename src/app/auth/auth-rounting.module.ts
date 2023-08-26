import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'security',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recovery-password',
        component: RecoveryPasswordComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutinModule { }