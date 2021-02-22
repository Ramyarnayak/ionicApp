import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppRegExp } from 'src/app/enums/app-regexp.enum';
import { UserDetail } from 'src/app/models/user-detail.model';

import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { TealiumEventType } from 'src/app/shared/tealium/enums/tealium-event-type.enum';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { CaptureEmailCardModel } from '../../shared/models/capture-email-card.model';

@Component({
  selector: 'app-capture-email-card',
  templateUrl: './capture-email-card.component.html',
  styleUrls: ['./capture-email-card.component.scss']
})
export class CaptureEmailCardComponent implements OnInit {

  @Input() captureEmailCardContent: CaptureEmailCardModel;

  @Input() emailCapturePurpose: string;

  @Input() total: number;

  @Input() consolidatedCode: string;

  @Input() private eventCategory: string;

  @Input() private eventLabelOptOut: string;

  @Input() private eventLabelSend: string;

  @Input() private eventName: string;

  @Input() private eventSuffixForm: string = 'email';

  @Input() private eventSuffixSend: string = 'send';

  emailValidatorRegExp: string = AppRegExp.EMAIL_VALIDATOR_REGEXP;
  loading: boolean;
  optOutState: boolean = false;
  userEmail: string;

  constructor(private submitUserDataService: SubmitUserDataService, private tealiumService: TealiumService) { }

  ngOnInit(): void {
    if(this.submitUserDataService.userDetail && this.submitUserDataService.userDetail.emailAddress) {
      let userDetails: UserDetail = this.submitUserDataService.userDetail;
      userDetails.score40ResultsConsolidatedCode = this.consolidatedCode;
      userDetails.score40ResultsSummary = this.total.toString();
      this.submitUserDataService.submitUserDetail(userDetails)
        .subscribe();
    }
  }

  get hasEmailCaptured(): boolean {
    return this.submitUserDataService.hasEmailCaptured;
  }

  get tealiumClickEventSend(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.eventCategory,
      this.eventName,
      this.eventLabelSend,
      null,
      this.eventSuffixSend);
  }

  onSubmit(isValidFormData: boolean): void {
    if (isValidFormData) {
      this.loading = true;
      this.submitUserDataService.submitUserDetail({
        emailAddress: this.userEmail,
        optOut: this.optOutState,
        score40Results: (this.emailCapturePurpose === 'article') ? false : true,
        score40ResultsConsolidatedCode: this.consolidatedCode,
        score40ResultsSummary: this.total.toString(),
        articleSubscription: (this.emailCapturePurpose === 'article') ? true : false,
      })
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe();
    }
  }

  tealiumClickEventInput(): void {
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.eventCategory,
        this.eventName,
        this.userEmail,
        null,
        this.eventSuffixForm
      ),
    TealiumEventType.Form);
  }

  toggleOptOutState(): void {
    this.optOutState = !this.optOutState;
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.eventCategory,
        this.eventName,
        this.eventLabelOptOut,
        null,
        `${this.optOutState ? 'optout' : 'optout-uncheck'}`,
        true
      ));
  }

}
