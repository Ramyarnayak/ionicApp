import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { ModularComponent } from './modular/modular.component';

const routes: Routes = [
  {
    component: ModularComponent,
    path: 'modular/about-us'
  },
  {
    component: BasicComponent,
    path: 'basic/:slug'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralTemplateRoutingModule { }
