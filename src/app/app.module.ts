import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './therapist/modules/home/home.module';
import { TherapistModule } from './therapist/therapist.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { AdminModule } from './admin/admin.module';
import {MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared-components/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TherapistModule,
    AuthModule,
    SharedComponentsModule,
    AdminModule,
    FontAwesomeModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
