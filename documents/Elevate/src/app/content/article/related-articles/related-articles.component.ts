import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Article, KnowledgeCenterLongArticles } from 'src/app/content/article/models/knowledge-center-long-articles.model';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Post } from 'src/app/models/post.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.scss']
})
export class RelatedArticlesComponent {

  @Input() relatedArticleData: KnowledgeCenterLongArticles;

  private currentPage: number = 1;

  private pageSize: number = 4;

  private tealiumEventCategory: string = 'customerhub-knowledgecenter';

  private tealiumEventName: string = 'article';

  constructor(private appCommonDataService: AppCommonDataService) { }

  get articles(): Array<Article> {
    return this.relatedArticleData?.articles?.slice(0, this.currentPage * this.pageSize);
  }

  get showLoadMore(): boolean {
    return this.currentPage * this.pageSize < this.relatedArticleData?.articles?.length;
  }

  get tealiumClickEventLoadMore(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      null,
      null,
      'loadmore'
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.appCommonDataService
      .getAppCommonData<Post>(AppContentName.Post, id);
  }

  getTealiumClickEventRelatedArticle(index: number, title: string): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      title,
      null,
      `relatedarticle${index}`
    );
  }

  onLoadMore(): void {
    this.currentPage++;
  }

  trackById(index: number, article: Article): string {
    return article.article.id;
  }

}
