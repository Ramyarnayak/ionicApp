import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { QuizState } from '../enums/quiz-state.enum';
import { Quiz } from '../models/quiz.model';
import { Tooltip } from '../models/tooltip.model';
import { QuizStateService } from '../services/quiz-state.service';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-tip',
  templateUrl: './quiz-tip.component.html',
  styleUrls: ['./quiz-tip.component.scss']
})
export class QuizTipComponent implements OnInit, OnDestroy {

  @Input() isEmailScreen: boolean = false;
  @Input() tooltip: Tooltip;

  isTipVisible: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private quizService: QuizService,
    private quizStateService: QuizStateService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.quizService.toggleQuizTip$.subscribe((toggleStatus: boolean) => {
          if (toggleStatus) {
            this.toggleTip();
          }
        }
      )
    );

    this.subscriptions.push(
      this.quizService.closeQuizTip$.subscribe((closeStatus: boolean) => {
          this.isTipVisible = !closeStatus;
        }
      )
    );
  }

  closeTip(): void {
    this.isTipVisible = false;
    this.quizService.QuizTipShown = false;
  }

  toggleTip(): void {
    if (this.tooltip?.body) {
      this.isTipVisible = !this.isTipVisible;
      this.quizService.QuizTipShown = !this.quizService.QuizTipShown;
    }
  }

  getTealiumClickEvent(suffix: string): Observable<TealiumClickEvent> {
    const eventCategory: string = 'customerhub-score40';

    return this.quizStateService
      .currentQuizState
      .pipe(
        take(1),
        switchMap((quizState: QuizState) => {
          if (quizState === QuizState.quizQuestionnaire) {
            return this.quizService
              .quiz
              .pipe(
                take(1),
                map((quiz: Quiz) => {
                  const quizBreakdownTabName: string = quiz.score40question[this.quizStateService.currentQuestion].quizBreakdownTabName;
                  return new TealiumClickEvent(eventCategory, quizBreakdownTabName, null, null, suffix);
                })
              );
          } else {
            return of(undefined); // We are only logging tags for questionnaire screen for now
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
