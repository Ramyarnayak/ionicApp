import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { CreditBillOfRightsComponent } from './credit-bill-of-rights/credit-bill-of-rights.component';
import { CreditBORCardComponent } from './credit-bill-of-rights/credit-bor-card/credit-bor-card.component';
import { FinancialSolutionsCtaComponent } from './financial-solutions-cta/financial-solutions-cta.component';
import { HeroComponent } from './hero/hero.component';
import { MoneyMentorCtaComponent } from './money-mentor-cta/money-mentor-cta.component';
import { StartYourClimbComponent } from './start-your-climb/start-your-climb.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { StartYourClimbTileComponent } from './start-your-climb-tile/start-your-climb-tile.component';

@NgModule({
  declarations: [
    AboutComponent,
    CreditBORCardComponent,
    CreditBillOfRightsComponent,
    FinancialSolutionsCtaComponent,
    HomeComponent,
    HeroComponent,
    MoneyMentorCtaComponent,
    StartYourClimbComponent,
    StartYourClimbTileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
