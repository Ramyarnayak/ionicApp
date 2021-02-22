import { SafeHtml } from '@angular/platform-browser';
import { Media } from '../../../models/media.model';
import { Navigation } from '../../../models/navigation.model';
import { Settings } from '../../../models/settings.model';

export interface OurStory {
    description: string;
    headline: string | SafeHtml;
    media?: Media;
    navigation?: Navigation;
    settings?: Settings;
    title: string;
}
