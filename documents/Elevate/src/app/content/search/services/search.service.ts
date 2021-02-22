import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { SearchResult } from '../models/search-result.model';

@Injectable()
export class SearchService {

  constructor(private cloudCmsService: CloudCmsService) { }

  search(searchString: string, types: Array<string>): Observable<SearchResult> {
    const queryString: string = this.searchQueryBuilder(searchString, types);
    return this.cloudCmsService.searchContent(queryString);
  }

  private searchQueryBuilder(searchString: string, types: Array<string>): string {

    const queryMapper: { knowledge_center: string, products: string, company_information: string } = {
      knowledge_center: '__type:"custom:post"',

      products: '__type:"custom:financialsolutionbankingcard" || __type:"custom:financialsolutionborrowingcard" || __type:"custom:financialsolutionmoneymanagementcard"',

      company_information: '__type:"custom:customerhubmodulartemplate" || __type:"custom:customerhubmtbody1" || __type:"custom:customerhubmtbody2" || __type:"custom:customerhubmtbody3" || __type:"custom:customerhubprivacypolicy" || __type:"custom:homehero" || __type:"custom:homesubhero" || __type:"custom:improving" || __type:"custom:knowledgecenterarticle" || __type:"custom:knowledgecenterarticlebody" || __type:"custom:knowledgecenterarticlehero" || __type:"custom:knowledgecenterfeaturedarticles" || __type:"custom:knowledgecenterlongarticles" || __type:"custom:knowledgecenterseriesarticles" || __type:"custom:ourcommitment" || __type:"custom:ourexecutives" || __type:"custom:ourpartners" || __type:"custom:ourstory" || __type:"custom:score40" || __type:"custom:score40"'
    };

    const typeMapperStringList: Array<string> = [];

    types.forEach((type: 'knowledge_center' | 'products' | 'company_information') => {
      if (queryMapper[type]) {
        typeMapperStringList.push(queryMapper[type]);
      }
    });

    if (typeMapperStringList.length > 0) {
      return `"${searchString}" AND ( ${typeMapperStringList.join(' || ')} )`;
    } else {
      return `"${searchString}"`;
    }
  }

}

