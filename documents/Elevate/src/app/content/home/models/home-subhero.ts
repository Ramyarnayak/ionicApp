import { SafeHtml } from '@angular/platform-browser';
import { Settings } from 'src/app/models/settings.model';

export interface HomeSubhero {
    title: string;
    headline: string | SafeHtml;
    description: string;
    settings?: Settings;
}
