import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { KnowledgeCenterComponent } from './knowledge-center.component';
import { KnowledgeCenterRoutingModule } from './knowledge-center-routing.module';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { KcAllArticlesComponent } from 'src/app/ui/kc-all-articles/kc-all-articles.component';
import { KcAllArticleCardComponent } from 'src/app/ui/kc-all-article-card/kc-all-article-card.component';
import { KcMarketingBarComponent } from './kc-marketing-bar/kc-marketing-bar.component';
@NgModule({
  declarations: [
    KcAllArticleCardComponent,
    KcAllArticlesComponent,
    KcMarketingBarComponent,
    KnowledgeCenterComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    KnowledgeCenterRoutingModule,
    SharedModule
  ]
})
export class KnowledgeCenterModule { }
