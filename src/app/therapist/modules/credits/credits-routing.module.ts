import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditsInfoComponent } from '../../shared-components/credits-info/credits-info.component';

const routes: Routes = [
  {
    path: 'credits-info', component: CreditsInfoComponent
  },
  {
    path: "",
    redirectTo: "credits-info",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CreditsRoutingModule { }