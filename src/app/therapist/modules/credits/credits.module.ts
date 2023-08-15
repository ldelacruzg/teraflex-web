import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsInfoComponent } from './credits-info/credits-info.component';
import { CreditsRoutingModule } from './credits-routing.module';



@NgModule({
  declarations: [
    CreditsInfoComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule
  ]
})
export class CreditsModule { }
