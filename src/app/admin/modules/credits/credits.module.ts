import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCreditsComponent } from './info-credits/info-credits.component';
import { CreditsRoutingModule } from './credits-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';



@NgModule({
  declarations: [
    InfoCreditsComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule,
    SharedComponentsModule
  ]
})
export class CreditsModule { }
