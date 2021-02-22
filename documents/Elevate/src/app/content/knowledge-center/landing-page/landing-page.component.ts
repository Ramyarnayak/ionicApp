import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import {
  map,
  take,
  tap
} from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Post } from 'src/app/models/post.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { MID_BLUE_DARK } from 'src/app/utils/consts.util';
import { KnowledgeCenter } from '../models/knowledge-center.model';
import { KnowledgeCenterLandingPage } from '../models/knowledge-center-landing-page.model';
import { KnowledgeCenterLongArticles } from '../models/knowledge-center-long-articles.model';
import { KnowledgeCenterMarketingBar } from '../models/knowledge-center-marketing-bar.model';
import { KnowledgeCenterService } from '../services/knowledge-center.service';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  knowledgeCenterlandingPage: Observable<KnowledgeCenterLandingPage>;

  scrollBarThumbColor: string = MID_BLUE_DARK;

  private tealiumEventCategory: string = 'customerhub-knowledgecenter';

  constructor(
    private activatedRoute: ActivatedRoute,
    private appCommonDataService: AppCommonDataService,
    private appService: AppService,
    private knowledgeCenterService: KnowledgeCenterService,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.knowledgeCenterlandingPage = combineLatest([
      this.appCommonDataService.appCommonData,
      this.knowledgeCenterService.knowledgeCenter,
      this.activatedRoute.params
    ]).pipe(
      map((result: [
        AppCommonData,
        KnowledgeCenter,
        Params
      ]) => {
        this.setTealiumData(result[2].slug);
        return {
          appCommonData: result[0],
          knowledgeCenter: result[1],
          params: result[2]
        };
      }),
      map((result: {
        appCommonData: AppCommonData,
        knowledgeCenter: KnowledgeCenter,
        params: Params
      }) => {
        let knowledgeCenterLandingPage: KnowledgeCenterLandingPage = result.knowledgeCenter
          .knowledgecenterlandingpage
          .find((landingPage: KnowledgeCenterLandingPage) => landingPage.slug === result.params.slug);

        knowledgeCenterLandingPage = {
          ...knowledgeCenterLandingPage,
          articles: result.knowledgeCenter
            .knowledgecenterlongarticles
            .find((longArticles: KnowledgeCenterLongArticles) => longArticles.id === knowledgeCenterLandingPage.articles.id),
          disclaimer: result.appCommonData
            .disclaimer
            .find((disclaimer: Disclaimer) => disclaimer.id === knowledgeCenterLandingPage.disclaimer.id),
          featuredCardArticle: result.appCommonData
            .post
            .find((post: Post) => post.id === knowledgeCenterLandingPage.featuredCardArticle.id),
          marketingBar: result.knowledgeCenter
            .knowledgecentermarketingbar
            .find((marketingBar: KnowledgeCenterMarketingBar) => marketingBar.id === knowledgeCenterLandingPage.marketingBar.id),
          relatedArticles: knowledgeCenterLandingPage
            .relatedArticles
            .map((relatedArticle: { article: Post }) => {
              return { article: result.appCommonData
                .post
                .find((post: Post) => post.id === relatedArticle.article.id) };
            }),
          series1: result.knowledgeCenter
            .knowledgecenterseriesarticles
            .find((seriesArticles: KnowledgeCenterSeriesArticles) => seriesArticles.id === knowledgeCenterLandingPage.series1.id),
          series2: result.knowledgeCenter
            .knowledgecenterseriesarticles
            .find((seriesArticles: KnowledgeCenterSeriesArticles) => seriesArticles.id === knowledgeCenterLandingPage.series2.id),
        };

        return knowledgeCenterLandingPage;
      }));
  }

  getTealiumClickEvent(
    eventName: string,
    suffix: string,
    title?: string
  ): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      eventName,
      title || null,
      null,
      suffix
    );
  }

  sendTealiumClickEventLongArticle(event: { index: number, title: string }): void {
    this.knowledgeCenterlandingPage
      .pipe(
        take(1),
        map((knowledgeCenterLandingPage: KnowledgeCenterLandingPage) => knowledgeCenterLandingPage.title),
        tap((eventName: string) => {
          this.tealiumService
            .clickEvent(new TealiumClickEvent(
              this.tealiumEventCategory,
              eventName,
              event.title,
              null,
              `article${event.index}`,
              false,
              event.index.toString()
            ));
        })
      )
      .subscribe();
  }

  sendTealiumClickEventMarketingBar(): void {
    this.knowledgeCenterlandingPage
      .pipe(
        take(1),
        map((knowledgeCenterLandingPage: KnowledgeCenterLandingPage) => knowledgeCenterLandingPage.title),
        tap((eventName: string) => {
          this.tealiumService
            .clickEvent(new TealiumClickEvent(
              this.tealiumEventCategory,
              eventName,
              null,
              null,
              `score40`,
              true
            ));
        })
      )
      .subscribe();
  }

  sendTealiumClickEventSeriesArticle(event: { index: number, title: string }): void {
    this.knowledgeCenterlandingPage
      .pipe(
        take(1),
        map((knowledgeCenterLandingPage: KnowledgeCenterLandingPage) => knowledgeCenterLandingPage.title),
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
      .setTealiumData({ page_name: `Knowledge Center - ${pageTitle}` });
  }

}
