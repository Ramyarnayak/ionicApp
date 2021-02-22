import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AppRegExp } from 'src/app/enums/app-regexp.enum';

import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { TealiumEventType } from 'src/app/shared/tealium/enums/tealium-event-type.enum';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { Quiz } from '../../models/quiz.model';
import { Score40CloseResults } from '../../models/score40-close-results.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-result-confirmation-dialog',
  templateUrl: './quiz-result-confirmation-dialog.component.html',
  styleUrls: ['./quiz-result-confirmation-dialog.component.scss']
})

export class QuizResultConfirmationDialogComponent implements OnInit {

  emailValidatorRegExp: string = AppRegExp.EMAIL_VALIDATOR_REGEXP;
  loading: boolean;
  userEmail: string;
  optOutState: boolean = false;

  closeResultsContent: Observable<Score40CloseResults>;

  constructor(
    private quizService: QuizService,
    private dialogRef: MatDialogRef<QuizResultConfirmationDialogComponent>,
    private submitUserDataService: SubmitUserDataService,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.closeResultsContent = this.quizService
      .quiz
      .pipe(
        map((quiz: Quiz) => quiz.score40closeresults[0])
      );
  }

  tealiumClickEventInput(): void {
    this.tealiumService.clickEvent(new TealiumClickEvent('customerhub-score40', 'save', null, null, 'email'), TealiumEventType.Form);
  }

  get tealiumClickEventLeave(): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-score40', 'save', '', '', 'leave');
  }

  get tealiumClickEventSave(): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-score40', 'save', '', '', 'save');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(isValidFormData: boolean): void {
    if (isValidFormData) {
      this.loading = true;
      this.submitUserDataService.submitUserDetail({
        emailAddress: this.userEmail,
        optOut: this.optOutState,
        score40Results: true,
        score40ResultsConsolidatedCode: '',
        score40ResultsSummary: '',
        articleSubscription: false,
        
      })
        .pipe(
          finalize(() => this.loading = false),
          tap(() => this.closeDialog())
        )
        .subscribe();
    }
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

}
