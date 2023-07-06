import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutinModule } from './modules/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './modules/home/home-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutinModule,
    HomeRoutingModule,
  ]
})
export class TherapistModule { }
