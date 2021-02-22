import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { ValueRange } from './value-range.model';

export interface FnsnState {
  title: string;
  label: string;
  filterAmountRange: ValueRange;
  bankingCards?: Array<{ bankingCard: CloudCmsContentReference }>;
  borrowingCards?: Array<{ borrowingCard: CloudCmsContentReference }>;
  id: string;
}
