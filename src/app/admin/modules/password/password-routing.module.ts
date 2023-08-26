import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: 'change-password', component: ChangePasswordComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PasswordRoutingModule { }