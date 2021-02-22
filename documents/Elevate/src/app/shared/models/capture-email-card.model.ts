import { Settings } from 'src/app/models/settings.model';

export interface CaptureEmailCardModel {
    title: string;
    headline1: string;
    headline2: string;
    optOutText: string;
    cta: string;
    id: string;
    ctaSettings: Settings;
    settings: Settings;
}
