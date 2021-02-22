import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Settings } from 'src/app/models/settings.model';

export interface FinancialSolutionBanking {
    description: string;
    disclaimer: Disclaimer;
    hashtag: string;
    headline: string;
    loadMoreCta: string;
    noOfferError: CloudCmsContentReference;
    noStateSelectionHeadline: string;
    settings: Settings;
}
