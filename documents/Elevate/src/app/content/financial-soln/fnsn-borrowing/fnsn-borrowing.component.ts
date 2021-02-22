import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { AppFormData } from 'src/app/content/home/models/app-form-data.model';
import { TealiumEventType } from 'src/app/shared/tealium/enums/tealium-event-type.enum';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { BorrowingCardCategory } from '../models/borrowing-card-category.model';
import { FinancialSolutionBorrowing } from '../models/financial-solution-borrowing.model';
import { FinancialSolutionBorrowingCard } from '../models/financial-solution-borrowing-card.model';
import { FnSnModel } from '../models/fnsn.model';
import { FnsnState } from '../models/fnsn-state.model';
import { NoOfferError } from '../models/no-offer-error.model';
import { NoResultError } from '../models/no-result-error.model';
import { StateRefs } from '../models/state-refs.model';
import { ValueRange } from '../models/value-range.model';

@Component({
  selector: 'app-fnsn-borrowing',
  templateUrl: './fnsn-borrowing.component.html',
  styleUrls: ['./fnsn-borrowing.component.scss']
})
export class FnSnBorrowingComponent implements OnChanges {

  @Input() financialSolution: FnSnModel;

  amount: string;
  borrowingCardCategory: Array<BorrowingCardCategory>;
  cardsPerPage: number = 6;
  categoryFilterList: Array<AppFormData>;
  currentPage: number = 1;
  filterAmountRange: ValueRange;
  financialSolutionBorrowing: FinancialSolutionBorrowing;
  noOfferErrorContent: NoOfferError;
  noResultErrorContent: NoResultError;
  rangeValue: number = 500;
  toggleFilter: boolean = false;
  selectedState: AppFormData;
  stateListToDisplay: Array<AppFormData>;

  private financialSolutionBorrowingCards: Array<FinancialSolutionBorrowingCard>;
  private stateRefs: StateRefs;
  private stateList: Array<FnsnState>;
  private tealiumEventCategory: string = 'customerhub-financialsolutions';
  private tealiumEventName: string = 'borrowing';

  constructor(private tealiumService: TealiumService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.financialSolution.currentValue) {
      const currentValue: FnSnModel = changes.financialSolution
        .currentValue;

      this.borrowingCardCategory = [...currentValue.borrowingcardcategory];
      this.financialSolutionBorrowing = currentValue.financialsolutionborrowing[0];
      this.stateRefs = currentValue.states[0];
      this.stateList = [...currentValue.state];
      this.financialSolutionBorrowingCards = [...currentValue.financialsolutionborrowingcard];

      this.setStateListToDisplay();
      this.setCategoryFilterList();
      this.setNoOfferErrorContent(currentValue.nooffererror);
      this.setNoResultErrorContent(currentValue.noresulterror);
    }
  }

  get borrowingCardCategoryFilters(): Array<BorrowingCardCategory> {
    return this.financialSolutionBorrowing?.filters
      .map((categoryRef: { borrowingCardCategory: CloudCmsContentReference }) =>
        this.borrowingCardCategory
          .find((category: BorrowingCardCategory) =>
            categoryRef.borrowingCardCategory.id === category.id));
  }

  get cardsToDisplay(): Array<FinancialSolutionBorrowingCard> {
    return this.borrowingCards
      ?.filter((card: FinancialSolutionBorrowingCard) =>
        this.isCardInAmountRange(card.creditAmountRange.minValue, card.creditAmountRange.maxValue) &&
        this.isCardInCategory(card.productType.id)
      );
  }

  get hasMoreCards(): boolean {
    return this.currentPage * this.cardsPerPage < this.stateList
      ?.find(
        (state: FnsnState) =>
          state.id === this.selectedState?.id)?.borrowingCards.length;
  }

  get noOfferError(): boolean {
    return !this.noStateSelected && this.stateList
      ?.find(
        (state: FnsnState) =>
          state.id === this.selectedState?.id)
      ?.borrowingCards.length === 0;
  }

  get noResultError(): boolean {
    return !this.noStateSelected && !this.noOfferError && this.cardsToDisplay?.length === 0;
  }

  get noStateSelected(): boolean {
    return this.selectedState?.label === 'Select a state';
  }

  dropdownOptionSelected(newValue: AppFormData): void {
    this.selectedState = newValue;
    this.setFilterAmountRange();
    this.tealiumService
      .clickEvent(
        new TealiumClickEvent(
          this.tealiumEventCategory,
          this.tealiumEventName,
          newValue.label,
          null,
          'state'
        ),
        TealiumEventType.Dropdown
      );
  }

  getTealiumResetClickEvent(): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      null,
      null,
      'resetfilters'
      );
  }

  onAmountChange(amount: string): void {
    this.tealiumService
      .clickEvent(
        new TealiumClickEvent(
          this.tealiumEventCategory,
          this.tealiumEventName,
          amount,
          null,
          'amount'
        ),
        TealiumEventType.Slider
      );
  }

  onCheckboxChange(eventName: string, value: boolean): void {
    this.tealiumService
      .clickEvent(
        new TealiumClickEvent(
          this.tealiumEventCategory,
          this.tealiumEventName,
          null,
          null,
          value ?
            `${eventName.toLowerCase().replace(/[^a-z0-9]/g, '')}` :
            `${eventName.toLowerCase().replace(/[^a-z0-9]/g, '')}-uncheck`,
          true
        ),
        TealiumEventType.Checkbox
      );
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

  onLoadMore(): void {
    this.currentPage++;
  }

  resetAllFilters(): void {
    this.resetCategoryFilter();
    this.resetRangeFilter();
  }

  resetCategoryFilter(): void {
    this.categoryFilterList.map((item: AppFormData) => item.checked = true);
  }

  resetRangeFilter(): void {
    this.rangeValue = Math.floor((this.filterAmountRange.minValue + this.filterAmountRange.maxValue) / 2);
  }

  setMinRangeFilter(): void {
    this.resetCategoryFilter();
    this.rangeValue = this.filterAmountRange.minValue;
  }

  sendTealiumBorrowingCardClickEvent(
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

  toggleFilterSheet(): void {
    this.toggleFilter = !this.toggleFilter;
  }

  trackByCardId(card: FinancialSolutionBorrowingCard): string {
    return card.id;
  }

  private setFilterAmountRange(): void {
    this.filterAmountRange = this.stateList
      ?.find(
        (state: FnsnState) =>
          state.id === this.selectedState?.id)
      ?.filterAmountRange;

    this.resetRangeFilter();
  }

  private setCategoryFilterList(): void {
    this.categoryFilterList = this.borrowingCardCategoryFilters
      ?.map((item: BorrowingCardCategory) => {
        return { id: item.id, label: item.label, checked: true };
      });
  }

  private setNoOfferErrorContent(data: Array<NoOfferError>): void {
    this.noOfferErrorContent = data
      ?.find((item: NoOfferError) =>
        item.id === this.financialSolutionBorrowing?.noOfferError.id
      );
  }

  private setNoResultErrorContent(data: Array<NoResultError>): void {
    this.noResultErrorContent = data
      ?.find((item: NoResultError) =>
        item.id === this.financialSolutionBorrowing?.noResultError.id
      );
  }

  private get borrowingCards(): Array<FinancialSolutionBorrowingCard> {
    return this.stateList
      ?.find(
        (state: FnsnState) =>
          state.id === this.selectedState?.id)
      ?.borrowingCards
      .slice(0, this.currentPage * this.cardsPerPage)
      .map(
        (cardRef: { borrowingCard: CloudCmsContentReference }) =>
          this.financialSolutionBorrowingCards
            ?.find(
              (card: FinancialSolutionBorrowingCard) =>
                card.id === cardRef.borrowingCard.id));
  }

  private isCardInAmountRange(minValue: number, maxValue: number): boolean {
    return this.rangeValue >= minValue && this.rangeValue <= maxValue;
  }

  private isCardInCategory(id: string): boolean {
    return this.categoryFilterList
      .find(
        (item: AppFormData) =>
          item.id === id
      ).checked;
  }

}
