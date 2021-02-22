import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTemplateRoutingModule } from './general-template-routing.module';
import { BasicComponent } from './basic/basic.component';
import { ModularComponent } from './modular/modular.component';
import { OurExecutivesComponent } from './modular/our-executives/our-executives.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JoinTeamBarComponent } from 'src/app/content/general-template/modular/join-team-bar/join-team-bar.component';
import { CustomerhubMtHeroComponent } from './customerhub-mt-hero/customerhub-mt-hero.component';
import { BeliefsComponent } from './modular/beliefs/beliefs.component';
import { ImpactComponent } from './modular/impact/impact.component';
import { QuoteComponent } from './modular/quote/quote.component';
import { MarketingBarComponent } from './modular/marketing-bar/marketing-bar.component';

@NgModule({
  declarations: [
    BasicComponent,
    ModularComponent,
    OurExecutivesComponent,
    JoinTeamBarComponent,
    CustomerhubMtHeroComponent,
    BeliefsComponent,
    ImpactComponent,
    QuoteComponent,
    MarketingBarComponent,
  ],
  imports: [
    CommonModule,
    GeneralTemplateRoutingModule,
    SharedModule
  ]
})
export class GeneralTemplateModule { }
