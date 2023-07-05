import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutinModule } from './modules/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthRoutinModule,
    HttpClientModule,
  ]
})
export class TherapistModule { }
