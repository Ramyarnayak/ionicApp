import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { BorrowingCardCategory } from '../models/borrowing-card-category.model';
import { BorrowingColumn } from '../models/borrowing-column.model';
import { FinancialSolutionBorrowingCard } from '../models/financial-solution-borrowing-card.model';

@Component({
  selector: 'app-fnsn-borrowing-card',
  templateUrl: './fnsn-borrowing-card.component.html',
  styleUrls: ['./fnsn-borrowing-card.component.scss']
})
export class FnsnBorrowingCardComponent implements OnChanges{

  @Input() borrowingCardCategoryList: Array<BorrowingCardCategory>;
  @Input() financialSolutionBorrowingCard: FinancialSolutionBorrowingCard;
  @Input() noStateSelected: boolean;
  @Input() selectedStateId: string;
  @Output() tealiumShowLessClickEvent: EventEmitter<string> = new EventEmitter();
  @Output() tealiumShowMoreClickEvent: EventEmitter<string> = new EventEmitter();
  @Output() tealiumVisitClickEvent: EventEmitter<string> = new EventEmitter();

  isExpandedView: boolean = false;
  isLongText: boolean = true;

  constructor(
    private appCommonDataService: AppCommonDataService
  ) { }

  get borrowingCardCategory(): BorrowingCardCategory {
    return this.borrowingCardCategoryList
      .find((category: BorrowingCardCategory) =>
        category.id === this.financialSolutionBorrowingCard.productType.id)
  }

  get expandedContentDisclaimer(): Observable<Disclaimer> {
    return this.appCommonDataService
      .getAppCommonData<Disclaimer>(AppContentName.Disclaimer, this.financialSolutionBorrowingCard.expandedContentDisclaimer.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStateId?.currentValue) {
      this.isExpandedView = false;
    }
  }

  columnsToDisplay(columns: Array<{ column: BorrowingColumn }>, noOfColumnsToDisplay: number): Array<{ column: BorrowingColumn }> {
    // noOfColumnToDisplay: We need this value to decide how many columns we need to display on the UI when the card is in minimized state.
    return this.isExpandedView ? columns : columns.slice(0, noOfColumnsToDisplay);
  }

  toggleIsExpandedView(): void {
    if (this.isExpandedView) {
      this.tealiumShowLessClickEvent
        .emit(this.financialSolutionBorrowingCard.headline);
    } else {
      this.tealiumShowMoreClickEvent
        .emit(this.financialSolutionBorrowingCard.headline);
    }

    this.isExpandedView = !this.isExpandedView;
  }

}
