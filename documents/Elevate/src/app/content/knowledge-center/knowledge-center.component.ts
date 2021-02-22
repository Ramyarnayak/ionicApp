import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';
import {
  map,
  switchMap,
  tap
} from 'rxjs/operators';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { AppCommonData } from 'src/app/models/app-common-data.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Post } from 'src/app/models/post.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { isMobile } from 'src/app/utils/is-mobile-observable.util';
import { KnowledgeCenter } from './models/knowledge-center.model';
import { KnowledgeCenterFeaturedArticles } from './models/knowledge-center-featured-articles.model';
import { KnowledgeCenterHero } from './models/knowledge-center-hero.model';
import { KnowledgeCenterHeroCard } from './models/knowledge-center-hero-card.model';
import { KnowledgeCenterPage } from './models/knowledge-center-page.model';
import { KnowledgeCenterService } from './services/knowledge-center.service';

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.scss']
})
export class KnowledgeCenterComponent implements OnInit {

  currentPage: BehaviorSubject<number> = new BehaviorSubject(1);

  disclaimer: Observable<Disclaimer>;

  isMoreFeaturedArticles: boolean = false;

  knowledgeCenterHero: Observable<KnowledgeCenterHero>;

  knowledgeCenterHeroCards: Observable<Array<KnowledgeCenterHeroCard>>;

  knowledgeCenterFeaturedArticles: Observable<KnowledgeCenterFeaturedArticles>;

  knowledgeCenterFeaturedArticlesPaged: Observable<KnowledgeCenterFeaturedArticles>;

  knowledgeCenterPage: Observable<KnowledgeCenterPage>;

  pageSizeDesktop: number = 12;

  pageSizeMobile: number = 6;

  private tealiumEventCategory: string = 'customerhub-knowledgecenter';

  constructor(
    private appCommonDataService: AppCommonDataService,
    private knowledgeCenterService: KnowledgeCenterService,
    private tealiumService: TealiumService
  ) { }

  get tealiumClickEventLoadMore(): TealiumClickEvent {
    return new TealiumClickEvent(this.tealiumEventCategory, 'loadmore');
  }

  ngOnInit(): void {
    this.setTealiumData();

    this.disclaimer = this.knowledgeCenterService
      .knowledgeCenter
      .pipe(switchMap((knowlegeCenter: KnowledgeCenter) => this.appCommonDataService
        .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, knowlegeCenter.knowledgecenterpage[0].disclaimer.id)));

    this.knowledgeCenterFeaturedArticles = this.appCommonDataService
      .appCommonData
      .pipe(switchMap((appCommonData: AppCommonData) => this.knowledgeCenterService
        .knowledgeCenter
        .pipe(map((knowledgeCenter: KnowledgeCenter) => {
          const featuredArticles: KnowledgeCenterFeaturedArticles = knowledgeCenter.knowledgecenterfeaturedarticles
            .find((featuredArts: KnowledgeCenterFeaturedArticles) => featuredArts.id === knowledgeCenter.knowledgecenterpage[0]
              .featuredArticles
              .id);

          return {
            ...featuredArticles,
            posts: featuredArticles
              .cards
              .filter((cardRef: { card: CloudCmsContentReference}) => cardRef.card)
              .map((cardRef: { card: CloudCmsContentReference }) => appCommonData.post.find((post: Post) => post.id === cardRef.card.id))
          };
        }))));

    // Observe viewport width, current page, and the total list of featured articles to update the displayed list.
    this.knowledgeCenterFeaturedArticlesPaged = combineLatest([
      this.currentPage,
      isMobile,
      this.knowledgeCenterFeaturedArticles
    ])
    .pipe(
      map((result: [number, boolean, KnowledgeCenterFeaturedArticles]) => {
        return {
          currentPage: result[0],
          isMobile: result[1],
          knowledgeCenterFeaturedArticles: result[2]
        };
      }),
      tap((result: {
        currentPage: number,
        isMobile: boolean,
        knowledgeCenterFeaturedArticles: KnowledgeCenterFeaturedArticles
      }) => {
        const currentPage: number = this.currentPage.getValue();
        const pageSize: number = result.isMobile ? this.pageSizeMobile : this.pageSizeDesktop;
        const totalFeaturedArticles: number = result.knowledgeCenterFeaturedArticles.posts.length;

        this.isMoreFeaturedArticles = currentPage * pageSize < totalFeaturedArticles;
      }),
      map((result: {
        isMobile: boolean,
        currentPage: number,
        knowledgeCenterFeaturedArticles: KnowledgeCenterFeaturedArticles
      }) => {
        const pageSize: number = result.isMobile ? this.pageSizeMobile : this.pageSizeDesktop;

        return {
          ...result.knowledgeCenterFeaturedArticles,
          posts: result.knowledgeCenterFeaturedArticles
            .posts
            .slice(0, result.currentPage * pageSize)
        };
      })
    );

    this.knowledgeCenterHero = this.knowledgeCenterService
      .knowledgeCenter
      .pipe(map((knowledgeCenter: KnowledgeCenter) => knowledgeCenter.knowledgecenterhero
        .find((hero: KnowledgeCenterHero) => hero.id === knowledgeCenter.knowledgecenterpage[0].hero.id)));

    this.knowledgeCenterHeroCards = this.knowledgeCenterService
      .knowledgeCenter
      .pipe(map((knowledgeCenter: KnowledgeCenter) => knowledgeCenter.knowledgecenterhero
        .find((hero: KnowledgeCenterHero) => hero.id === knowledgeCenter.knowledgecenterpage[0].hero.id)
        .cards
        .map((cardReference: { card: CloudCmsContentReference }) => knowledgeCenter.knowledgecenterherocard
          .find((card: KnowledgeCenterHeroCard) => card.id === cardReference.card.id))));

    this.knowledgeCenterPage = this.knowledgeCenterService
      .knowledgeCenter
      .pipe(map((knowledgeCenter: KnowledgeCenter) => knowledgeCenter.knowledgecenterpage[0]));
  }

  getTealiumClickEventArticles(index: number, post: Post): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      'article',
      post.title,
      null,
      'readmore',
      false,
      index.toString()
    );
  }

  getTealiumClickEventHeroList(knowledgeCenterHeroCard: KnowledgeCenterHeroCard): TealiumClickEvent {
    return new TealiumClickEvent(this.tealiumEventCategory, knowledgeCenterHeroCard.headline);
  }

  incrementPage(): void {
    this.currentPage
      .next(this.currentPage.getValue() + 1);
  }

  private setTealiumData(): void {
    this.tealiumService
      .setTealiumData({ page_name: 'Knowledge Center' });
  }

}
