import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { QuizResult } from '../../models/quiz-result.model';
import { Score40ResultsHero } from '../../models/score40-results-hero.model';
import { QuizResultService } from '../../services/quiz-result.service';
import { QuizStateService } from '../../services/quiz-state.service';

@Component({
  selector: 'app-quiz-result-header',
  templateUrl: './quiz-result-header.component.html',
  styleUrls: ['./quiz-result-header.component.scss']
})
export class QuizResultHeaderComponent implements OnInit {

  quizResultsHero: Observable<Score40ResultsHero>;

  private tealiumEventCategory: string = 'customerhub-score40';

  private tealiumEventName: string = 'results';

  constructor(
    private quizStateService: QuizStateService,
    private quizResultsService: QuizResultService,
    private submitUserDataService: SubmitUserDataService
  ) { }

  get tealiumClickEventDone(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      null,
      null,
      'done'
    );
  }

  get tealiumClickEventRestart(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      null,
      null,
      'restart'
    );
  }

  ngOnInit(): void {
    this.quizResultsHero = this.quizResultsService
      .quizResult
      .pipe(
        map((quiz: QuizResult) => quiz.score40resultshero[0])
      );
  }

  restartQuiz(): void {
    this.submitUserDataService.hasEmailCaptured = false;
    this.submitUserDataService.userDetail = null;
    this.quizStateService
      .restartQuiz();
  }

}
