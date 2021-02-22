import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { QuizState } from '../enums/quiz-state.enum';
import { Quiz } from '../models/quiz.model';
import { QuizStateService } from '../services/quiz-state.service';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent {

  constructor(
    private quizStateService: QuizStateService,
    private quizService: QuizService
  ) { }

  getTealiumClickEvent(): Observable<TealiumClickEvent> {
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
                  return new TealiumClickEvent(eventCategory, quizBreakdownTabName, null, null, 'close');
                })
              );
          } else {
            return of(new TealiumClickEvent(eventCategory, 'close'));
          }
        }));
  }

}
