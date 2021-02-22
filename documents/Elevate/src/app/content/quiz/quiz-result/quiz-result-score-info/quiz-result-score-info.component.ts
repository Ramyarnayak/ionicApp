import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { Post } from 'src/app/models/post.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { MID_BLUE_DARK } from 'src/app/utils/consts.util';
import { isMobile } from 'src/app/utils/is-mobile-observable.util';
import { QuizResult } from '../../models/quiz-result.model';
import { Score40Option } from '../../models/score40-option.model';
import { Score40Question } from '../../models/score40-question.model';
import { Score40ResultsQuizBreakdown } from '../../models/score40-results-quiz-breakdown.model';
import { QuizResultService } from '../../services/quiz-result.service';
import { QuizStateService } from '../../services/quiz-state.service';

@Component({
  selector: 'app-quiz-result-score-info',
  templateUrl: './quiz-result-score-info.component.html',
  styleUrls: ['./quiz-result-score-info.component.scss']
})
export class QuizResultScoreInfoComponent implements OnInit {

  @Input() isEmailCaptured: boolean = false;

  activeTabIndex: number = 0;

  isMobile: Observable<boolean> = isMobile;

  optionsSelectedArray: Array<{ answer: Partial<Score40Option>, question: Score40Question }>;

  quizBreakdown: Observable<Score40ResultsQuizBreakdown>;

  scrollBarThumbColor: string = MID_BLUE_DARK;

  constructor(
    private appCommonDataService: AppCommonDataService,
    private quizResultService: QuizResultService,
    private quizStateService: QuizStateService,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.optionsSelectedArray = this.quizStateService
      .optionsSelectedArray
      .filter((currentValue: { answer: Partial<Score40Option>, question: Score40Question }, index: number) => {
        // For custom flow, filter out the hardcoded answers
        return this.quizStateService
          .useCustomFlow
          .getValue() ?
            (index === 0 || index === 2) :
            true;
      });

    this.quizBreakdown = this.quizResultService
      .quizResult
      .pipe(map((quizResult: QuizResult) => quizResult.score40resultsquizbreakdown
          .find((quizBreakdown: Score40ResultsQuizBreakdown) => quizBreakdown.id === quizResult.score40resultspage[0]
              .quizBreakdown
              .id)));
  }

  get activeTab(): Observable<{ answer: Partial<Score40Option>, question: Score40Question }> {
    return this.appCommonDataService
      .appCommonData
      .pipe(
        map((appCommonData: AppCommonData) => appCommonData.post),
        switchMap((posts: Array<Post>) => {
          return this.quizResultService
            .quizResult
            .pipe(
              map(() => {
                const option: {
                  answer: Partial<Score40Option>,
                  question: Score40Question
                } = this.optionsSelectedArray[this.activeTabIndex];

                return {
                  answer: {
                    ...option.answer,
                    resultsCarouselItems: option.answer
                      .resultsCarousel
                      .map((ref: { item: CloudCmsContentReference }) => posts.find((post: Post) => {
                        return ref.item ? ref.item.id === post.id : false;
                      }))
                  },
                  question: { ...option.question }
                };
              })
            );
        })
      );
  }

  getTealiumCarouselClickEvent(index: number, label: string): TealiumClickEvent {
    return new TealiumClickEvent(
      'customerhub-score40',
      'results',
      label,
      null,
      `resource${index + 1}`
    );
  }

  setActiveTabIndex(index: number): void {
    this.activeTabIndex = index;
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        'customerhub-score40',
        'results',
        null,
        null,
        this.optionsSelectedArray[this.activeTabIndex].question.quizBreakdownTabName
      ));
  }

}
