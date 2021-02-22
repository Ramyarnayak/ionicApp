import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { AppFormData } from 'src/app/content/home/models/app-form-data.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { FinancialSolutionBanking } from '../models/financial-solution-banking.model';
import { FinancialSolutionBankingCard } from '../models/financial-solution-banking-card.model';
import { FnSnModel } from '../models/fnsn.model';
import { FnSnPage } from '../models/fnsn-page.model';
import { FnsnState } from '../models/fnsn-state.model';
import { NoOfferError } from '../models/no-offer-error.model';
import { StateRefs } from '../models/state-refs.model';

@Component({
  selector: 'app-fnsn-banking',
  templateUrl: './fnsn-banking.component.html',
  styleUrls: ['./fnsn-banking.component.scss']
})
export class FnSnBankingComponent implements OnChanges {

  @Input() financialSolution: FnSnModel;

  banking: FinancialSolutionBanking;

  currentPage: number = 1;

  fnsnPage: FnSnPage;

  pageSize: number = 6;

  selectedState: AppFormData;

  stateListToDisplay: Array<AppFormData>;

  private stateRefs: StateRefs;

  private stateList: Array<FnsnState> = [];

  private tealiumEventCategory: string = 'customerhub-financialsolutions';

  private tealiumEventName: string = 'banking';

  constructor(
    private appCommonDataService: AppCommonDataService,
    private element: ElementRef,
    private tealiumService: TealiumService
  ) { }

  get bankingCards(): Array<FinancialSolutionBankingCard> {
    return this.stateList
      .find((state: FnsnState) => state.id === this.selectedState?.id)
      ?.bankingCards
      .map((bankingCardRef: { bankingCard: CloudCmsContentReference }) => {
        return this.financialSolution
          .financialsolutionbankingcard
          .find((bankingCard: FinancialSolutionBankingCard) => bankingCard.id === bankingCardRef.bankingCard.id);
      })
      .slice(0, this.currentPage * this.pageSize);
  }

  get expandedContentDisclaimer(): Observable<Disclaimer> {
    return this.appCommonDataService
      .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, this.fnsnPage?.disclaimer.id);
  }

  get isMoreCards(): boolean {
    return this.currentPage * this.pageSize < this.bankingCards?.length;
  }

  get noOfferError(): NoOfferError {
    return this.financialSolution
      ?.nooffererror
      .find((noOfferError: NoOfferError) => noOfferError.id === this.banking.noOfferError.id);
  }

  get noStateSelected(): boolean {
    // TODO: Don't use the label to determine whether a state is selected.
    return this.selectedState?.label === 'Select a state';
  }

  get tealiumScrollToTopClickEvent(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      'scrolltotop'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.financialSolution.currentValue) {
      const currentValue: FnSnModel = changes.financialSolution
        .currentValue;

      this.banking = { ...currentValue.financialsolutionbanking[0] };
      this.fnsnPage = { ...currentValue.financialsolutionpage[0] };
      this.stateRefs = { ...currentValue.states[0] };
      this.stateList = [...currentValue.state];

      this.setStateListToDisplay();
    }
  }

  incrementPage(): void {
    this.currentPage++;
  }

  onDropdownOptionSelected(option: AppFormData): void {
    this.currentPage = 1;
    this.selectedState = option;
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.tealiumEventCategory,
        this.tealiumEventName,
        option.label,
        null,
        'state'
      ));
  }

  onErrorTealiumClickEvent(): void {
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.tealiumEventCategory,
        this.tealiumEventName,
        null,
        null,
        'quinstreet'
      ));
  }

  onScrollToTopClick(): void {
    const appElement: Element = this.element.nativeElement.closest('.App');
    appElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendTealiumBankingCardClickEvent(
    index: number,
    title: string,
    type: string
  ): void {
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.tealiumEventCategory,
        this.tealiumEventName,
        title,
        null,
        `result${index.toString()}-${type}`,
        true
      ));
  }

  setStateListToDisplay(): void {
    this.stateListToDisplay = this.stateRefs?.states
      .map((refs: { state: CloudCmsContentReference }) =>
        this.stateList
          .find(
            (state: FnsnState) => state.id === refs.state.id))
      ?.map((fnsnState: FnsnState) => {
        return {
          label: fnsnState.label,
          id: fnsnState.id
        };
      });
    this.selectedState = this.stateListToDisplay[0];
  }

}
