import {
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import {
  filter,
  map,
  take,
  tap
} from 'rxjs/operators';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { Quiz } from '../models/quiz.model';
import { QuizResult } from '../models/quiz-result.model';
import { ScreenLoading } from '../models/screen-loading.model';
import { QuizService } from '../services/quiz.service';
import { QuizResultService } from '../services/quiz-result.service';
import { QuizStateService } from '../services/quiz-state.service';

const animationNameOnLastScreenLoadingText: string = 'fade-in-out-last';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {

  screenLoading: Observable<ScreenLoading[]>;

  constructor(
    private appCommonDataService: AppCommonDataService,
    private element: ElementRef,
    private quizService: QuizService,
    private quizResultService: QuizResultService,
    private quizStateService: QuizStateService
  ) { }

  ngOnInit(): void {
    const animationEnd: Observable<AnimationEvent> = fromEvent(this.element.nativeElement, 'animationend')
      .pipe(filter((event: AnimationEvent) => event.animationName === animationNameOnLastScreenLoadingText));

    const result: Observable<QuizResult> = this.quizResultService
      .quizResult;

    combineLatest([animationEnd, result])
      .pipe(
        take(1),
        tap(() => this.quizStateService.goToNextState()),
      )
      .subscribe();

    this.screenLoading = this.quizService
      .quiz
      .pipe(map((quiz: Quiz) => quiz.score40screenloading));
  }

  getDisclaimer(id: string): Observable<Disclaimer> {
    return this.appCommonDataService
      .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, id);
  }
}
