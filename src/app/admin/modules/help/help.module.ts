import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpRoutingModule } from './help-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { ListVideosHelpComponent } from './list-videos-help/list-videos-help.component';

@NgModule({
  declarations: [
    ListVideosHelpComponent,
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedComponentsModule
  ]
})
export class HelpModule { }
