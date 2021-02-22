import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleFeedbackComponent } from './article-feedback/article-feedback.component';
import { ArticleHeroComponent } from './article-hero/article-hero.component';
import { KeyTakeawaysComponent } from './key-takeaways/key-takeaways.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';
import { ArticleSummaryAndTocComponent } from './article-summary-and-toc/article-summary-and-toc.component';
import { ArticleBodyComponent } from './article-body/article-body.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleHeroComponent,
    ArticleBodyComponent,
    ArticleSummaryAndTocComponent,
    ArticleFeedbackComponent,
    KeyTakeawaysComponent,
    RelatedArticlesComponent
  ],
  imports: [
    ArticleRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class ArticleModule { }
