import { SafeHtml } from '@angular/platform-browser';

import { CloudCmsContentReference } from './cloud-cms-content-reference.model';
import { Settings } from 'src/app/models/settings.model';
import { Navigation } from 'src/app/models/navigation.model';

export interface KnowledgeCenter {
    headline: string | SafeHtml;
    posts: Array<{ post: CloudCmsContentReference }>;
    settings: Settings;
    subheading: string;
    title: string;
    navigation: Navigation;
}
