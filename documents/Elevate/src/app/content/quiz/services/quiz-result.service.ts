import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { Score40ResultsValueMapping } from 'src/app/models/score40-results-value-mapping';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { CaptureEmailCardModel } from 'src/app/shared/models/capture-email-card.model';
import { Score40ResultsCard } from '../models/score40-results-card.model';
import { Score40ResultsCardMapping } from '../models/score40-results-card-mapping.model';
import { Score40ResultsCarouselItem } from '../models/score40-results-carousel-item.model';
import { Score40ResultsHero } from '../models/score40-results-hero.model';
import { Score40ResultsNote } from '../models/score40-results-note.model';
import { Score40ResultsPage } from '../models/score40-results-page.model';
import { Score40ResultsQuizBreakdown } from '../models/score40-results-quiz-breakdown.model';
import { QuizResult } from '../models/quiz-result.model';
import { QuizStateService } from './quiz-state.service';

const cacheSize: number = 1;

@Injectable()
export class QuizResultService {

  private cache: Observable<QuizResult>;

  private readonly quizResultPageContentNames: string[] = [
    'score40emailresults',
    'score40resultscard',
    'score40resultscardmapping',
    'score40resultscarouselitem',
    'score40resultshero',
    'score40resultsnote',
    'score40resultspage',
    'score40resultsquizbreakdown'
  ];

  private score40ResultsTotalPoints: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  score40ResultsTotalPoints$: Observable<number> = this.score40ResultsTotalPoints.asObservable();

  constructor(
    private cloudCmsService: CloudCmsService,
    private http: HttpClient,
    private quizStateService: QuizStateService) { }

  get quizResult(): Observable<QuizResult> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<QuizResult> {
    return this.cloudCmsService
      .queryCollections(this.quizResultPageContentNames, true)
      .pipe(map((response: [
        CloudCmsContent<CaptureEmailCardModel[]>,
        CloudCmsContent<Score40ResultsCard[]>,
        CloudCmsContent<Score40ResultsCardMapping[]>,
        CloudCmsContent<Array<Score40ResultsCarouselItem>>,
        CloudCmsContent<Score40ResultsHero[]>,
        CloudCmsContent<Score40ResultsNote[]>,
        CloudCmsContent<Array<Score40ResultsPage>>,
        CloudCmsContent<Array<Score40ResultsQuizBreakdown>>
      ]) => {
        const quizResult: QuizResult = response.reduce((
          accumulator: Partial<QuizResult>,
          contentItem: CloudCmsContent<CaptureEmailCardModel[]> |
            CloudCmsContent<Score40ResultsCard[]> |
            CloudCmsContent<Score40ResultsCardMapping[]> |
            CloudCmsContent<Array<Score40ResultsCarouselItem>> |
            CloudCmsContent<Score40ResultsHero[]> |
            CloudCmsContent<Score40ResultsNote[]> |
            CloudCmsContent<Array<Score40ResultsPage>> |
            CloudCmsContent<Array<Score40ResultsQuizBreakdown>>
        ) => {
          const content: Partial<QuizResult> = {};

          content[contentItem.content] = contentItem.data;

          return { ...accumulator, ...content };
        }, {}) as QuizResult;

        return {
          ...quizResult
        };
      }));
  }

  getScore40ResutValueMapping(): Observable<Score40ResultsValueMapping> {
    console.log('Base Code - ' + this.quizStateService.optionsSelectedArray.map(option => option.answer.value).join(''));
    return this.http
      .get<Score40ResultsValueMapping[]>('assets/json/score40ValueMapping.json')
      .pipe(map((values: Score40ResultsValueMapping[]) => values
        .find((value: Score40ResultsValueMapping) => value.baseCode === parseInt(this.quizStateService.optionsSelectedArray
          .map(option => option.answer.value).join('')))));
  }

  setCore40ResultPoints(totalPoints: number): void {
    this.score40ResultsTotalPoints.next(totalPoints);
  }
}
