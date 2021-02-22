import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { CustomerhubMtBody1 } from '../models/customerhub-mt-body1.model';
import { ContentBasic } from '../models/content-basic';
import { CustomerhubMtBody3 } from '../models/customerhub-mt-body3.model';
import { ModularTemplate } from '../models/customerhub-mt.model';
import { GeneralTemplatePage } from '../models/general-template-page.model';
import { JoinTeamBar } from '../models/join-team-bar.model';
import { OurExecutives } from '../models/our-executives.model';
import { CustomerhubMtQuoteBar } from '../models/customerhub-mt-quote-bar.model';
import { CustomerhubMtBody2 } from '../models/customerhub-mt-body2.model';
import { CustomerhubMtMarketingBar } from '../models/customerhub-mt-marketing-bar.model';


const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class GeneralTemplateService {

  private cache: Observable<GeneralTemplatePage>;

  private readonly contentNames: string[] = [
    'customerhubmtbody1',
    'customerhubmtbody2',
    'customerhubmtbody3',
    'ourexecutives',
    'customerhubmodulartemplate',
    'customerhubmtjointeambar',
    'customerhubmtmarketingbar',
    'customerhubmtquotebar'
  ];

  constructor(private cloudCmsService: CloudCmsService) { }

  get generalTemplatePage(): Observable<GeneralTemplatePage> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  getContentBasic(slug: string): Observable<ContentBasic> {
    return this.cloudCmsService
      .searchContent(`slug:"${slug}"`)
      .pipe(map((searchResults: { data: Array<ContentBasic> }) => searchResults.data[0]));
  }

  private requestData(): Observable<GeneralTemplatePage> {
    return this.cloudCmsService
      .queryCollections(this.contentNames)
      .pipe(map((response: [
        CloudCmsContent<Array<CustomerhubMtBody1>>,
        CloudCmsContent<Array<CustomerhubMtBody3>>,
        CloudCmsContent<Array<OurExecutives>>,
        CloudCmsContent<Array<ModularTemplate>>,
        CloudCmsContent<Array<JoinTeamBar>>,
        CloudCmsContent<Array<CustomerhubMtMarketingBar>>,
        CloudCmsContent<Array<CustomerhubMtQuoteBar>>,
        CloudCmsContent<Array<CustomerhubMtBody2>>
      ]) => {
        const generalTemplateContent: GeneralTemplatePage = response.reduce((
          accumulator: Partial<GeneralTemplatePage>,
          contentItem: CloudCmsContent<Array<CustomerhubMtBody1>> |
          CloudCmsContent<Array<CustomerhubMtBody3>> |
          CloudCmsContent<Array<OurExecutives>> |
          CloudCmsContent<Array<ModularTemplate>> |
          CloudCmsContent<Array<JoinTeamBar>> |
          CloudCmsContent<Array<CustomerhubMtMarketingBar>> |
          CloudCmsContent<Array<CustomerhubMtQuoteBar>> |
          CloudCmsContent<Array<CustomerhubMtBody2>>
        ) => {
          const content: Partial<GeneralTemplatePage> = {};

          content[contentItem.content] = contentItem.data;

          return { ...accumulator, ...content };
        }, {}) as GeneralTemplatePage;

        return {
          ...generalTemplateContent
        };
      }));
  }

}
