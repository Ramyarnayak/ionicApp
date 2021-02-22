import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { FnSnModel } from '../models/fnsn.model';
import { FnSnMoneyManagement } from '../models/fnsn-money-management.model';
import { FnSnMoneyManagementCard } from '../models/fnsn-money-management-card.model';

@Component({
  selector: 'app-fnsn-money-management',
  templateUrl: './fnsn-money-management.component.html',
  styleUrls: ['./fnsn-money-management.component.scss']
})
export class FnSnMoneyManagementComponent implements OnChanges {

  @Input() financialSolution: FnSnModel;

  currentPage: number = 1;

  moneyManagement: FnSnMoneyManagement;

  pageSize: number = 6;

  private moneyManagementCards: Array<FnSnMoneyManagementCard>;

  constructor(private tealiumService: TealiumService) {}

  get isMoreCards(): boolean {
    return this.currentPage * this.pageSize < this.moneyManagement?.moneyManagementCards.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.financialSolution.currentValue) {
      const currentValue: FnSnModel = changes.financialSolution
        .currentValue;

      this.moneyManagementCards = [ ...currentValue.financialsolutionmoneymanagementcard ];

      this.setMoneyManagement(currentValue.financialsolutionmoneymanagement[0]);
    }
  }

  incrementPage(): void {
    this.currentPage++;
    this.setMoneyManagement({ ...this.moneyManagement });
  }

  setMoneyManagement(moneyManagement: FnSnMoneyManagement): void {
    this.moneyManagement = {
      ...moneyManagement,
      moneyManagementCardItems: moneyManagement.moneyManagementCards
        .slice(0, this.currentPage * this.pageSize)
        .map((ref: { moneyManagementCard: CloudCmsContentReference }) => this.moneyManagementCards
            .find((card: FnSnMoneyManagementCard) => card.id === ref.moneyManagementCard.id))
    };
  }

  sendTealiumClickEvent(
    index: number,
    title: string
  ): void {
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        'customerhub-financialsolutions',
        'moneymanagement',
        title,
        null,
        `result${index}-learnmore`,
        true
      ));
  }

  trackById(index: number, card: FnSnMoneyManagementCard): string {
    return card.id;
  }

}
