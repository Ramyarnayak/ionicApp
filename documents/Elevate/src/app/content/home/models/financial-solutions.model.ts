import { SafeHtml } from '@angular/platform-browser';

import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface FinancialSolutions {
    id: string;
    headline: string | SafeHtml;
    subheading: string;
    title: string;
    navigation?: Navigation;
    settings?: Settings;
    solutionList: Array<{ solution: CloudCmsContentReference }>;
    disclaimer?: Disclaimer;
}
