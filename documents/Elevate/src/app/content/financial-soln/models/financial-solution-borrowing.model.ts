import { Settings } from 'src/app/models/settings.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface FinancialSolutionBorrowing {
  title: string;
  hashTag: string;
  headline: string;
  description: string;
  noStateSelectedHeadline: string;
  states: CloudCmsContentReference;
  needToBorrowText: string;
  filterHeadline: string;
  filters: Array<{ borrowingCardCategory: CloudCmsContentReference }>;
  loadMoreCta: string;
  noOfferError: CloudCmsContentReference;
  noResultError: CloudCmsContentReference;
  settings: Settings;
}
