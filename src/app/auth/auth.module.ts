import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutinModule } from './auth-rounting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NoAccountComponent } from './no-account/no-account.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { LoginComponent } from './login/login.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { PasswordModule } from '../therapist/modules/password/password.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    NoAccountComponent,
    OtpCodeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutinModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedComponentsModule,
    ToastrModule.forRoot(),
    PasswordModule
  ]
})
export class AuthModule { }
