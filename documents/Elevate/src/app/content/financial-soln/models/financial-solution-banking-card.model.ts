import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Ratings } from './ratings.model';

export interface FinancialSolutionBankingCard {
    columns: Array<{ column: string }>;
    cta: Navigation;
    description: string;
    expandCta: string;
    expandedContentBody: string;    // Rich text
    expandedContentDisclaimer: CloudCmsContentReference;
    headline: string;
    id: string;
    image: CloudCmsContentReference;
    minimizeCta: string;
    ratings: Ratings;
}
