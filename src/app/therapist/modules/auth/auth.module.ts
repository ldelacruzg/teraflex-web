import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutinModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { NoAccountComponent } from './no-account/no-account.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    NoAccountComponent,
    OtpCodeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutinModule,
    ReactiveFormsModule,
    SharedComponentsModule,    
    FontAwesomeModule
  ]
})
export class AuthModule { }
