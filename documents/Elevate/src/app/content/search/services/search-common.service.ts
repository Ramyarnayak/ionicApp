import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { SearchCategories } from '../models/search-categories.model';
import { SearchPage } from '../models/search-page.model';


const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class SearchCommonService {

  private cache: Observable<SearchPage>;

  private readonly contentNames: string[] = [
    'searchcategories'
  ];

  constructor(private cloudCmsService: CloudCmsService) { }

  get searchPageContent(): Observable<SearchPage> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<SearchPage> {
    return this.cloudCmsService
      .queryCollections(this.contentNames)
      .pipe(map((response: [
        CloudCmsContent<Array<SearchCategories>>
      ]) => {
        const searchPageContent: SearchPage = response.reduce((
          accumulator: Partial<SearchPage>,
          contentItem: CloudCmsContent<Array<SearchCategories>>
        ) => {
          const content: Partial<SearchPage> = {};

          content[contentItem.content] = contentItem.data;

          return { ...accumulator, ...content };
        }, {}) as SearchPage;

        return {
          ...searchPageContent
        };
      }));
  }

}

