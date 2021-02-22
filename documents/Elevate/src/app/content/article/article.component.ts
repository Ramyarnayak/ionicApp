import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import {
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { Post } from 'src/app/models/post.model';
import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { KnowledgeCenterArticle } from './models/knowledge-center-article.model';
import { ArticleDetailService } from './services/article-detail.service';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleDetailService, SubmitUserDataService]
})
export class ArticleComponent implements OnInit {

  article: Observable<KnowledgeCenterArticle>;

  post: Observable<Post>;

  private tealiumEventCategory: string = 'customerhub-knowledgecenter';

  private tealiumEventName: string = 'article';

  constructor(
    private activatedRoute: ActivatedRoute,
    private appCommonDataService: AppCommonDataService,
    private appService: AppService,
    private articleDetailService: ArticleDetailService,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.post = combineLatest([
      this.appCommonDataService.appCommonData,
      this.activatedRoute.params
    ]).pipe(
      map((result: [AppCommonData, Params]) => {
        this.setTealiumData(result[1].slug);
        return { appCommonData: result[0], params: result[1] };
      }),
      map((result: { appCommonData: AppCommonData, params: Params }) => {
        return result.appCommonData
          .post
          .find((post: Post) => post.slug?.trim() === result.params.slug);
      })
    );

    this.article = this.post
      .pipe(switchMap((post: Post) => this.articleDetailService
        .article(post.article.id)));
  }

  sendTealiumClickEventFeedback(feedback: 'satisfied' | 'unsatisfied'): void {
    this.post
      .pipe(
        take(1),
        tap((post: Post) => this.tealiumService
          .clickEvent(new TealiumClickEvent(
            this.tealiumEventCategory,
            this.tealiumEventName,
            post.title,
            null,
            feedback === 'unsatisfied' ? 'helpfulno' : 'helpfulyes'
          )))
      )
      .subscribe();
  }

  sendTealiumClickEventSeriesArticle(event: { index: number, title: string }): void {
    this.post
      .pipe(
        take(1),
        map((post: Post) => post.category.title),
        tap((eventName: string) => {
          this.tealiumService
            .clickEvent(new TealiumClickEvent(
              this.tealiumEventCategory,
              eventName,
              event.title,
              null,
              `series-article${event.index}`,
              true
            ));
        })
      )
      .subscribe();
  }

  private setTealiumData(slug: string): void {
    const pageTitle = this.appService.getTitleFromSlug(slug);
    this.tealiumService
      .setTealiumData({ page_name: pageTitle });
  }

}
