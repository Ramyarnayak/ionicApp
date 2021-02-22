import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowledgeCenterComponent } from './knowledge-center.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    component: KnowledgeCenterComponent,
    path: ''
  },
  {
    component: LandingPageComponent,
    path: ':slug'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeCenterRoutingModule { }
