import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { FinancialSolutionBankingCard } from '../models/financial-solution-banking-card.model';

@Component({
  selector: 'app-fnsn-banking-card',
  templateUrl: './fnsn-banking-card.component.html',
  styleUrls: ['./fnsn-banking-card.component.scss']
})
export class FnsnBankingCardComponent implements OnInit {

  @Input() bankingCard: FinancialSolutionBankingCard;

  @Output() tealiumShowLessClickEvent: EventEmitter<string> = new EventEmitter();

  @Output() tealiumShowMoreClickEvent: EventEmitter<string> = new EventEmitter();

  @Output() tealiumVisitClickEvent: EventEmitter<string> = new EventEmitter();

  disclaimer: Observable<Disclaimer>;

  isExpanded: boolean = false;

  constructor(private appCommonDataService: AppCommonDataService) {}

  ngOnInit(): void {
    this.disclaimer = this.appCommonDataService
      .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, this.bankingCard.expandedContentDisclaimer.id);
  }

  toggleIsExpanded(): void {
    if (this.isExpanded) {
      this.tealiumShowLessClickEvent
        .emit(this.bankingCard.headline);
    } else {
      this.tealiumShowMoreClickEvent
        .emit(this.bankingCard.headline);
    }

    this.isExpanded = !this.isExpanded;
  }

}
