import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { KnowledgeCenter } from '../models/knowledge-center.model';
import { KnowledgeCenterFeaturedArticles } from '../models/knowledge-center-featured-articles.model';
import { KnowledgeCenterHero } from '../models/knowledge-center-hero.model';
import { KnowledgeCenterHeroCard } from '../models/knowledge-center-hero-card.model';
import { KnowledgeCenterLandingPage } from '../models/knowledge-center-landing-page.model';
import { KnowledgeCenterPage } from '../models/knowledge-center-page.model';
import { KnowledgeCenterLongArticles } from '../models/knowledge-center-long-articles.model';
import { KnowledgeCenterMarketingBar } from '../models/knowledge-center-marketing-bar.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';

const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class KnowledgeCenterService {

  private cache: Observable<KnowledgeCenter>;

  private readonly contentNames: string[] = [
    'knowledgecenterfeaturedarticles',
    'knowledgecenterhero',
    'knowledgecenterherocard',
    'knowledgecenterlandingpage',
    'knowledgecenterlongarticles',
    'knowledgecentermarketingbar',
    'knowledgecenterseriesarticles',
    'knowledgecenterpage'
  ];

  constructor(private cloudCmsService: CloudCmsService) { }

  get knowledgeCenter(): Observable<KnowledgeCenter> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<KnowledgeCenter> {
    return this.cloudCmsService
      .queryCollections(this.contentNames)
      .pipe(map((response: [
        CloudCmsContent<Array<KnowledgeCenterFeaturedArticles>>,
        CloudCmsContent<Array<KnowledgeCenterHero>>,
        CloudCmsContent<Array<KnowledgeCenterHeroCard>>,
        CloudCmsContent<Array<KnowledgeCenterLandingPage>>,
        CloudCmsContent<Array<KnowledgeCenterLongArticles>>,
        CloudCmsContent<Array<KnowledgeCenterMarketingBar>>,
        CloudCmsContent<Array<KnowledgeCenterSeriesArticles>>,
        CloudCmsContent<Array<KnowledgeCenterPage>>
      ]) => {
        const knowledgeCenter: KnowledgeCenter = response.reduce((
          accumulator: Partial<KnowledgeCenter>,
          contentItem: CloudCmsContent<Array<KnowledgeCenterFeaturedArticles>> |
            CloudCmsContent<Array<KnowledgeCenterHero>> |
            CloudCmsContent<Array<KnowledgeCenterHeroCard>> |
            CloudCmsContent<Array<KnowledgeCenterLandingPage>> |
            CloudCmsContent<Array<KnowledgeCenterLongArticles>> |
            CloudCmsContent<Array<KnowledgeCenterMarketingBar>> |
            CloudCmsContent<Array<KnowledgeCenterSeriesArticles>> |
            CloudCmsContent<Array<KnowledgeCenterPage>>
        ) => {
          const content: Partial<KnowledgeCenter> = {};

          content[contentItem.content] = contentItem.data;

          return { ...accumulator, ...content };
        }, {}) as KnowledgeCenter;

        return {
          ...knowledgeCenter
        };
      }));
  }

}
