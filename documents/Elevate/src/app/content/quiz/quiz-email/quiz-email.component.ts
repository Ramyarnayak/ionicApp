import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize, map, tap } from 'rxjs/operators';

import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { QuizEmail } from '../models/quiz-email.model';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';
import { QuizStateService } from '../services/quiz-state.service';
import { Theme } from 'src/app/enums/theme.enum';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { AppRegExp } from 'src/app/enums/app-regexp.enum';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { TealiumEventType } from 'src/app/shared/tealium/enums/tealium-event-type.enum';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-quiz-email',
  templateUrl: './quiz-email.component.html',
  styleUrls: ['./quiz-email.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ])
  ]
})

export class QuizEmailComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private quizStateService: QuizStateService,
    private submitUserDataService: SubmitUserDataService,
    private tealiumService: TealiumService
  ) { }

  emailValidatorRegExp: string = AppRegExp.EMAIL_VALIDATOR_REGEXP;

  quizEmailData: Observable<QuizEmail>;
  userEmail: string;
  optOutState: boolean = false;

  loading: boolean;

  ngOnInit(): void {
    this.quizEmailData = this.quizService.quiz.pipe(map((quiz: Quiz) => quiz.score40emailquiz[0]));
  }

  onSubmit(isValidFormData: boolean): void {
    if (isValidFormData) {
      this.submitUserDataService.setUserData({
        emailAddress: this.userEmail,
        optOut: this.optOutState,
        score40Results: true,
        score40ResultsConsolidatedCode: '',
        score40ResultsSummary: '',
        articleSubscription: false,
      });
      this.moveToQuizEndScreen();
    }
  }

  get quizTheme(): Theme {
    return this.quizService.quizTheme;
  }

  getTealiumClickEvent(subCategory: string, suffix: string, leaveSuffixDirty: boolean = false): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-score40', subCategory, null, null, suffix, leaveSuffixDirty);
  }

  getTealiumClickEventOnForm(): void {
    this.tealiumService.clickEvent(new TealiumClickEvent('customerhub-score40', 'save', null, null, 'email'), TealiumEventType.Form);
  }

  moveToQuizEndScreen(): void {
    this.quizStateService
      .goToNextState();
  }

  toggleOptOutState(): void {
    this.optOutState = !this.optOutState;
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        'customerhub-score40',
        'save',
        '',
        '',
        `${this.optOutState ? 'optout' : 'optout-uncheck'}`,
        true
      ));
  }

  get hasEmailCaptured(): boolean {
    return this.submitUserDataService.hasEmailCaptured;
  }
}
