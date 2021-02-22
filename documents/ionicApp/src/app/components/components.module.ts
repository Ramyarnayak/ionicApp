import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [SlidesComponent,
 
  LogoComponent,
StartComponent],
  exports:[SlidesComponent,
 
    LogoComponent,
  StartComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
