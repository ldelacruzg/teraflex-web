import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutinModule } from './auth-rounting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NoAccountComponent } from './modals/no-account/no-account.component';
import { OtpCodeComponent } from './modals/otp-code/otp-code.component';
import { LoginComponent } from './login/login.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { PasswordModule } from '../therapist/modules/password/password.module';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoveryPasswordComponent,
    NoAccountComponent,
    OtpCodeComponent,
    ForgotPasswordComponent
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
