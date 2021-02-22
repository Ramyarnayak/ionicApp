import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { KnowledgeCenter } from 'src/app/models/knowledge-center.model';
import { AppCommonData } from 'src/app/models/app-common-data.model';
import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { FinancialSolution } from 'src/app/models/financial-solution';
import { Header, HeaderNavigationItem } from 'src/app/models/header-new.model';
import { Image } from 'src/app/models/image.model';
import { Post } from 'src/app/models/post.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { CookieBar } from 'src/app/models/cookie-bar.model';
import { FinancialSolutions } from 'src/app/content/home/models/financial-solutions.model';

const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class AppCommonDataService {

  private cache: Observable<AppCommonData>;

  private readonly contentNames: string[] = [
    AppContentName.FinancialSolution,
    AppContentName.FinancialSolutions,
    AppContentName.Header,
    AppContentName.HeaderNavigationItem,
    AppContentName.Image,
    AppContentName.Post,
    AppContentName.Disclaimer,
    AppContentName.KnowledgeCenter,
    AppContentName.CookieBar
  ];


  constructor(private cloudCmsService: CloudCmsService) {}

  get appCommonData(): Observable<AppCommonData> {
    if (!this.cache) {
      this.cache = this.fetchAppCommonData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  getAppCommonData<T>(contentName: AppContentName, id?: string): Observable<T> {
    return this.appCommonData
      .pipe(map((appCommonData: object) => {
        if (!id) {
          return appCommonData[contentName];
        } else {
          return appCommonData[contentName].find((item: { id: string }) => item.id === id);
        }
      }));
  }

  private fetchAppCommonData(): Observable<AppCommonData> {
    return this.cloudCmsService
      .queryCollections(this.contentNames)
      .pipe(map((response: [
        CloudCmsContent<FinancialSolution>,
        CloudCmsContent<FinancialSolutions>,
        CloudCmsContent<Header>,
        CloudCmsContent<HeaderNavigationItem>,
        CloudCmsContent<Image>,
        CloudCmsContent<Post>,
        CloudCmsContent<Disclaimer>,
        CloudCmsContent<KnowledgeCenter>,
        CloudCmsContent<CookieBar>
      ]) => {
        return response.reduce((
          accumulator: Partial<AppCommonData>,
          contentItem: CloudCmsContent<
            FinancialSolution |
            FinancialSolutions |
            Header |
            HeaderNavigationItem |
            Image |
            Post |
            Disclaimer |
            KnowledgeCenter |
            CookieBar
          >
        ) => {
          const content: Partial<AppCommonData> = {};

          content[contentItem.content] = contentItem.data.length > 1 ? [...contentItem.data] : contentItem.data[0];

          return {...accumulator, ...content};
        }, {}) as AppCommonData;
      }));
  }

}
