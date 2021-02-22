import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { FinancialSolution } from 'src/app/models/financial-solution';
import { Navigation } from 'src/app/models/navigation.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-financial-solutions-card',
  templateUrl: './financial-solutions-card.component.html',
  styleUrls: ['./financial-solutions-card.component.scss']
})
export class FinancialSolutionsCardComponent implements OnInit, OnDestroy {

  @Input() isScore40Results: boolean;
  @Input() navigation: Navigation;
  @Input() reference: { solution: CloudCmsContentReference };
  @Input() showAll: boolean = false;

  financialSolution: Observable<FinancialSolution>;

  subscriptions: Subscription[] = [];

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnInit(): void {
    this.financialSolution = this.appCommonDataService
      .getAppCommonData<FinancialSolution>(AppContentName.FinancialSolution, this.reference?.solution.id);
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach((s: Subscription) => s.unsubscribe());
  }

  getTealiumClickEvent(financialSolutionTitle: string): TealiumClickEvent {
    const clickEventHome: TealiumClickEvent = new TealiumClickEvent(
      'customerhub-homepage-financialsolutions',
      financialSolutionTitle
    );

    const clickEventScore40: TealiumClickEvent = new TealiumClickEvent(
      'customerhub-score40',
      'results',
      null,
      null,
      `financialsolutions-${this.cleanTagText(financialSolutionTitle)}`,
      true
    );

    return this.isScore40Results ? clickEventScore40 : clickEventHome;
  }

  onCardClick(link: string): void {
    window.open(link, '_blank');
  }

  private cleanTagText(dirty: string): string {
    return dirty?.toLowerCase()
        .replace(/[^a-z0-9]/g, '');
  }

}
