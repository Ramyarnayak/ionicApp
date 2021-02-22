import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

import { KnowledgeCenterLandingPage } from './knowledge-center-landing-page.model';

export interface KnowledgeCenterHeroCard {
    cta: Navigation;
    description: string;
    headline: string;
    id: string;
    landingPage: KnowledgeCenterLandingPage;
    settings: Settings;
}
