import { SafeHtml } from '@angular/platform-browser';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

import { Settings } from '../../../models/settings.model';

export interface QuizIntro {
    headline1: string;
    headline2: string | SafeHtml;
    subheading: string;
    steps: Array<{ step: string }>;
    cta: string;
    settings: Settings;
    showDisclaimerCta: string;
    hideDisclaimerCta: string;
    disclaimer: CloudCmsContentReference;
}
