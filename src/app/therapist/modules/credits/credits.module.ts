import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsInfoComponent } from './credits-info/credits-info.component';
import { CreditsRoutingModule } from './credits-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';



@NgModule({
  declarations: [
    CreditsInfoComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule,
    SharedComponentsModule
  ]
})
export class CreditsModule { }
