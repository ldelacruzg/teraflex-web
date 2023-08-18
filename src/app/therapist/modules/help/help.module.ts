import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpRoutingModule } from './help-routing.module';
import { ViewVideosHelpComponent } from './view-videos-help/view-videos-help.component';
import { ListVideosHelpComponent } from './list-videos-help/list-videos-help.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [
    ListVideosHelpComponent,
    ViewVideosHelpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelpRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    ListVideosHelpComponent
  ]
})
export class HelpModule { }
