import { SafeHtml } from '@angular/platform-browser';
import { Settings } from 'src/app/models/settings.model';
import { Tooltip } from './tooltip.model';

export interface QuizEmail {
    title: string;
    headline: string | SafeHtml;
    subheading: string;
    tooltip: { tooltip: Tooltip };
    optOutText: string;
    skipCta: string;
    nextCta: string;
    settings: Settings;
    id: string;
}
