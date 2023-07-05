import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLoginComponent } from './info-login/info-login.component';

@NgModule({
  declarations: [
    InfoLoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InfoLoginComponent
  ]
})
export class SharedComponentsModule { }
