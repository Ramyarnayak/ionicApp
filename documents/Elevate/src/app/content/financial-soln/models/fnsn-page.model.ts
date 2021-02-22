import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';

export interface FnSnPage {
  disclaimer: Disclaimer;
  financialSolutionBanking: CloudCmsContentReference;
  scrollToTopCta: string;
}
