import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';

import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { CaptureEmailCardModel } from 'src/app/shared/models/capture-email-card.model';
import { ArticleHero } from '../models/article-hero.model';
import { KnowledgeCenterArticle } from '../models/knowledge-center-article.model';
import { KnowledgeCenterArticleFeedbackBar } from '../models/knowledge-center-article-feedback-bar.model';
import { KnowledgeCenterLongArticles } from '../models/knowledge-center-long-articles.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { ArticleBody } from '../models/article-body.model';

const cacheSize: number = 1;

@Injectable()
export class ArticleDetailService {

  private cache: Array<Observable<KnowledgeCenterArticle>> = [];

  constructor(private cloudCmsService: CloudCmsService) { }

  article(id: string): Observable<KnowledgeCenterArticle> {
    if (!this.cache[id]) {
      this.cache[id] = this.requestData(id)
        .pipe(shareReplay(cacheSize));
    }

    return this.cache[id];
  }

  private requestData(id: string): Observable<KnowledgeCenterArticle> {
    return this.cloudCmsService
      .getContentByNodeId<Array<{ data: KnowledgeCenterArticle }>>(id)
      .pipe(switchMap((articles: Array<{ data: KnowledgeCenterArticle }>) => {
        const article: KnowledgeCenterArticle = articles[0].data;

        return forkJoin([
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: ArticleBody }>>(article.articleBody.id)
            .pipe(map((value: Array<{ data: ArticleBody }>) => this.mapFromArray<ArticleBody>(value))),
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: ArticleHero }>>(article.articleHero.id)
            .pipe(map((value: Array<{ data: ArticleHero }>) => this.mapFromArray<ArticleHero>(value))),
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: CaptureEmailCardModel }>>(article.emailBar.id)
            .pipe(map((value: Array<{ data: CaptureEmailCardModel }>) => this.mapFromArray<CaptureEmailCardModel>(value))),
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: KnowledgeCenterArticleFeedbackBar }>>(article.feedbackBar.id)
            .pipe(map((value: Array<{ data: KnowledgeCenterArticleFeedbackBar }>) => this.mapFromArray<KnowledgeCenterArticleFeedbackBar>(value))),
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: KnowledgeCenterLongArticles }>>(article.relatedArticles.id)
            .pipe(map((value: Array<{ data: KnowledgeCenterLongArticles }>) => this.mapFromArray<KnowledgeCenterLongArticles>(value))),
          this.cloudCmsService
            .getContentByNodeId<Array<{ data: KnowledgeCenterSeriesArticles }>>(article.seriesArticles.id)
            .pipe(map((value: Array<{ data: KnowledgeCenterSeriesArticles }>) => this.mapFromArray<KnowledgeCenterSeriesArticles>(value))),
        ]).pipe(
          map((result: [
            ArticleBody,
            ArticleHero,
            CaptureEmailCardModel,
            KnowledgeCenterArticleFeedbackBar,
            KnowledgeCenterLongArticles,
            KnowledgeCenterSeriesArticles
          ]) => {
            return {
              ...article,
              articleBody: result[0],
              articleHero: result[1],
              emailBar: result[2],
              feedbackBar: result[3],
              relatedArticles: result[4],
              seriesArticles: result[5]
            };
          })
        );
      }));
  }

  private mapFromArray<T>(array: Array<{ data: T }>): T {
    return array[0].data;
  }

}
