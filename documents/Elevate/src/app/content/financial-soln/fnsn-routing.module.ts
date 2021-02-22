import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FnSnComponent } from './fnsn.component';


const routes: Routes = [{
  component: FnSnComponent,
  path: ''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FnSnRoutingModule { }
