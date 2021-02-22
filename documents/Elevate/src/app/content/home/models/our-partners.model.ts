import { SafeHtml } from '@angular/platform-browser';
import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface OurPartners {
    title: string;
    headline: string | SafeHtml;
    subheading: string;
    navigationList: Array<{ navigation: Navigation }>;
    cta: string;
    settings: Settings;
}