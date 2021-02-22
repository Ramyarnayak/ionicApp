import {
  HttpBackend,
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResult } from '../content/search/models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class CloudCmsService {

  private httpBackend: HttpClient;

  constructor(handler: HttpBackend, private http: HttpClient) {
    this.httpBackend = new HttpClient(handler);
  }

  // GET CMS CONTENT OF A SINGLE COLLECTION
  public getCmsByCollectionName(collectionItem: string, ignoreInterceptors?: boolean): Observable<any> {

    return this.queryCollections([collectionItem], ignoreInterceptors)
      .pipe(map((res) => res[0].data));
  }

  // GET CMS CONTENT OF MULTIPLE COLLECTIONS
  public queryCollections(collectionItem: string[], ignoreInterceptors?: boolean): Observable<any> {
    const contentNames: string = collectionItem.join(',');
    const http: HttpClient = ignoreInterceptors ? this.httpBackend : this.http;
    const options: { params: { contentName: string, projectId: string, 'subscription-key': string } } = {
      params: {
        contentName: contentNames,
        projectId: environment.cloudCms.projectId.toString(),
        'subscription-key': environment.cloudCms['subscription-key']
      },
    };

    return http.get<any>(
      environment.cloudCms.url + '/queryCmsContent',
      options
    );
  }

  // GET CMS CONTENT BY NOED ID
  public getContentByNodeId<T>(id: string): Observable<T> {
    const params: HttpParams = new HttpParams()
      .set('projectId', environment.cloudCms
        .projectId
        .toString())
      .set('subscription-key', environment.cloudCms['subscription-key'])
      .set('nodeId', id);

    return this.http
      .get<T>(`${environment.cloudCms.url}/getContentByNodeId`, { params });
  }

  // SEARCH CMS CONTENT BY USING ELASTIC QUERY STRING
  // https://www.cloudcms.com/documentation/search/query-string.html
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
  public searchContent(queryString: string): Observable<any> {
    const options: { params: { queryString: string, projectId: string, 'subscription-key': string } } = {
      params: {
        projectId: environment.cloudCms.projectId.toString(),
        queryString,
        'subscription-key': environment.cloudCms['subscription-key']
      },
    };
    return this.httpBackend.get<SearchResult>(
      environment.cloudCms.url + '/searchCmsContent',
      options
    );
  }
}
