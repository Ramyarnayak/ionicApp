import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Settings } from 'src/app/models/settings.model';
import { ImprovingSection } from './improving-section';

export interface Improving {
    title: string;
    headline: string;
    section1: ImprovingSection;
    section2: ImprovingSection;
    section3: ImprovingSection;
    settings: Settings;
    disclaimer: Disclaimer;
}
