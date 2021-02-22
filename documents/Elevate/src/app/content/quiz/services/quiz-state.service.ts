import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { QuizState } from '../enums/quiz-state.enum';
import { Score40Option } from '../models/score40-option.model';
import { Score40Question } from '../models/score40-question.model';

@Injectable()
export class QuizStateService {

  optionsSelectedArray: Array<{ answer: Partial<Score40Option>, question: Score40Question }> = [];

  currentQuestion: number = 0;

  totalQuestions: number = -1;

  useCustomFlow: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private currentQuizStateBehaviorSubject: BehaviorSubject<QuizState> = new BehaviorSubject(0);

  get currentQuizState(): Observable<QuizState> {
    return this.currentQuizStateBehaviorSubject
      .asObservable();
  }

  goToNextState(): void {
    this.currentQuizState
      .pipe(
        take(1),
        tap((currentQuizState: QuizState) => this.currentQuizStateBehaviorSubject
          .next(++currentQuizState))
      )
      .subscribe();
  }

  goToPreviousState(): void {
    this.currentQuizState
      .pipe(
        take(1),
        tap((currentQuizState: QuizState) => this.currentQuizStateBehaviorSubject
          .next(Math.max(--currentQuizState, 0)))
      )
      .subscribe();
  }

  restartQuiz(): void {
    this.currentQuizState
      .pipe(
        take(1),
        tap(() => this.currentQuizStateBehaviorSubject
          .next(0))
      )
      .subscribe(() => {
        this.currentQuestion = 0;
        this.totalQuestions = -1;
        this.optionsSelectedArray = [];
      });
  }

}
