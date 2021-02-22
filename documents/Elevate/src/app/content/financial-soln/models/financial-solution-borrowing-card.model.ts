import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';
import { BorrowingColumn } from './borrowing-column.model';
import { Ratings } from './ratings.model';
import { ValueRange } from './value-range.model';

export interface FinancialSolutionBorrowingCard {
    columns: Array<{ column: BorrowingColumn }>;
    creditAmountRange: ValueRange;
    cta: Navigation;
    description: string;
    expandCta: string;
    expandedContentBody: string;
    expandedContentDisclaimer: CloudCmsContentReference;
    headline: string;
    id: string;
    logo: CloudCmsContentReference;
    minimizeCta: string;
    noOfColumnsToDisplay: number;
    productType: CloudCmsContentReference;
    productTypeSettings: Settings;
    ratings: Ratings;
    settings: Settings;
    title: string;
}
