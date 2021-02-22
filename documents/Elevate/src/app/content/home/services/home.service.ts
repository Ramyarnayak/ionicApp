import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from '../../../models/cloud-cms-content.model';
import { Score40 } from '../../../models/score40.model';
import { CloudCmsService } from '../../../services/cloud-cms.service';
import { Home } from '../models/home.model';
import { HomeHero } from '../models/home-hero.model';
import { OurCommitment } from '../models/our-commitment.model';
import { OurStory } from '../models/our-story.model';
import { YourOptions } from '../models/your-options.model';
import { OurPartners } from '../models/our-partners.model';
import { HomePage } from '../models/home-page.model';

const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private cache: Observable<Home>;

  private readonly hamePageContentNames: string[] = [
    'homepage',
    'homehero',
    'ourcommitment',
    'ourstory',
    'score40',
    'youroptions',
    'homesubhero',
    'ourpartners',
    'improving',
    'footer'
  ];

  constructor(private cloudCmsService: CloudCmsService) {}

  get home(): Observable<Home> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<Home> {
    return this.cloudCmsService
      .queryCollections(this.hamePageContentNames)
      .pipe(map((response: [
        CloudCmsContent<HomePage>,
        CloudCmsContent<HomeHero>,
        CloudCmsContent<OurCommitment>,
        CloudCmsContent<OurStory>,
        CloudCmsContent<Score40>,
        CloudCmsContent<YourOptions>,
        CloudCmsContent<OurPartners>
      ]) => {
        const home: Home =  response.reduce((accumulator: Partial<Home>, contentItem: CloudCmsContent<any>) => {
          const content: Partial<Home> = {};

          content[contentItem.content] = contentItem.data[0];

          return {...accumulator, ...content};
        }, {}) as Home;

        return {
          ...home
        };
      }));
  }

}
