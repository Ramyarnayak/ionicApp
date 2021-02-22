import { SafeHtml } from '@angular/platform-browser';

import { Navigation } from '../../../models/navigation.model';
import { Settings } from '../../../models/settings.model';

export class HomeHero {
    description: string;
    headline: string | SafeHtml;
    navigation: Navigation;
    theme: Settings;
}
