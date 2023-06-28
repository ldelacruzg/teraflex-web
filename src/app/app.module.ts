import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './therapist/modules/auth/auth.module';
import { TherapistModule } from './therapist/therapist.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TherapistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
