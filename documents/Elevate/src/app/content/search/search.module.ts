import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [
    SearchComponent
  ],
  exports: [ SearchComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SharedModule
  ],
})
export class SearchModule {

}
