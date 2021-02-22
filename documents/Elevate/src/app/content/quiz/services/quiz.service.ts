import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Theme } from 'src/app/enums/theme.enum';
import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { QuizIntro } from '../models/quiz-intro.model';
import { Quiz } from '../models/quiz.model';
import { QuizCloseModal } from '../models/quiz-close-modal';
import { QuizEmail } from '../models/quiz-email.model';
import { Score40Option } from '../models/score40-option.model';
import { Score40Question } from '../models/score40-question.model';
import { Score40QuestionOrder } from '../models/score40-question-order.model';
import { ScreenLoading } from '../models/screen-loading.model';
import { Score40CloseResults } from '../models/score40-close-results.model';

const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  closeQuizTip$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  toggleQuizTip$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public QuizTipShown: boolean = false;
  public BackFromQuiz: boolean = false;
  private cache: Observable<Quiz>;

  quizTheme: Theme;

  private readonly quizPageContentNames: string[] = [
    'score40emailquiz',
    'score40exitwarning',
    'score40intro',
    'score40option',
    'score40question',
    'score40questionorder',
    'score40screenloading',
    'score40closeresults'
  ];

  constructor(private cloudCmsService: CloudCmsService) { }

  get quiz(): Observable<Quiz> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<Quiz> {
    return this.cloudCmsService
      .queryCollections(this.quizPageContentNames)
      .pipe(
        map((response: [
          CloudCmsContent<Array<QuizEmail>>,
          CloudCmsContent<Array<QuizCloseModal>>,
          CloudCmsContent<Array<QuizIntro>>,
          CloudCmsContent<Array<Score40Option>>,
          CloudCmsContent<Array<Score40Question>>,
          CloudCmsContent<Array<Score40QuestionOrder>>,
          CloudCmsContent<Array<ScreenLoading>>,
          CloudCmsContent<Array<Score40CloseResults>>
        ]) => {
          const quiz: Quiz = response.reduce((
            accumulator: Partial<Quiz>,
            contentItem: CloudCmsContent<Array<QuizEmail>> |
              CloudCmsContent<Array<QuizCloseModal>> |
              CloudCmsContent<Array<QuizIntro>> |
              CloudCmsContent<Array<Score40Option>> |
              CloudCmsContent<Array<Score40Question>> |
              CloudCmsContent<Array<Score40QuestionOrder>> |
              CloudCmsContent<Array<ScreenLoading>> |
              CloudCmsContent<Array<Score40CloseResults>>
          ) => {
            const content: Partial<Quiz> = {};

            content[contentItem.content] = contentItem.data;

            return { ...accumulator, ...content };
          }, {}) as Quiz;

          return {
            ...quiz
          };
        }),
        map((quiz: Quiz) => {
          return {
            ...quiz,
            score40question: quiz.score40questionorder[0]
              .questionOrder
              .map((order: { question: CloudCmsContentReference }) => quiz.score40question.find((question: Score40Question) => question.id === order.question.id))
          };
        })
      );
  }

}
