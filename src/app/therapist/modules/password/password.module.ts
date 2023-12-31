import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WarningChangePasswordComponent } from './modals/warning-change-password/warning-change-password.component';
import { PasswordRoutingModule } from './password-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    WarningChangePasswordComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule
  ],
  exports:[
    WarningChangePasswordComponent
  ]
})
export class PasswordModule { }
