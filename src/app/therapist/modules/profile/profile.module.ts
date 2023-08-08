import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

@NgModule({
  declarations: [
    ViewMyProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    SharedComponentsModule
  ]
})
export class ProfileModule { }
