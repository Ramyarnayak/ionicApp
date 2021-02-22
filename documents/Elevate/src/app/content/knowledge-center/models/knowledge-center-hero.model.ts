import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Settings } from 'src/app/models/settings.model';

export interface KnowledgeCenterHero {
    cards: Array<{ card: CloudCmsContentReference }>;
    description: string;
    headline: string;   // rich text
    id: string;
    settings: Settings;
}
