import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Theme } from 'src/app/enums/theme.enum';
import { Quiz } from '../models/quiz.model';
import { QuizIntro } from '../models/quiz-intro.model';
import { QuizService } from '../services/quiz.service';
import { QuizStateService } from '../services/quiz-state.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import {trigger, style, animate, transition, query, stagger} from '@angular/animations';
import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ]),
    trigger('movetop', [
      transition('void => *', [
        style({ 'margin-top': '1000px' }),
        animate(1000, style({'margin-top': 0}))
      ])
    ])
  ]
})

export class QuizIntroComponent implements OnInit {

  isStartButtonDisabled: boolean = false;

  quizIntro: Observable<QuizIntro>;

  showDisclaimer: boolean = false;

  startLeaveAnimation: boolean = false;

  startEnterAnimation: boolean = false;

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-score40', 'start');

  constructor(
    private quizService: QuizService,
    private quizStateService: QuizStateService,
    private submitUserDataService: SubmitUserDataService,
    private appCommonDataService: AppCommonDataService
  ) {}

  ngOnInit(): void {
    this.quizIntro = this.quizService
      .quiz
      .pipe(
        tap((quiz: Quiz) => this.quizService.quizTheme = quiz?.score40intro[0]?.settings.theme),
        map((quiz: Quiz) => quiz.score40intro[0]),
      );
    this.startEnterAnimation = this.quizService.BackFromQuiz;
  }

  startQuiz(): void {
    this.isStartButtonDisabled = true;
    this.startLeaveAnimation = true;
    this.submitUserDataService.hasEmailCaptured = false;
    this.quizStateService
      .goToNextState();
  }

  setBackgroundColor(quizIntro: QuizIntro): { 'background-color': Theme } {
    return { 'background-color': Theme[quizIntro?.settings.theme] };
  }

  getQuizIntroDisclaimer(id: string): Observable<Disclaimer> {
    return this.appCommonDataService
      .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, id);
  }

}
