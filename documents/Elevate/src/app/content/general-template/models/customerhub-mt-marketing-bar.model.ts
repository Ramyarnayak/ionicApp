import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface CustomerhubMtMarketingBar {
  title: string;
  headline1: string;
  headline2: string;
  cta: Navigation;
  settings: Settings;
  id: string;
}
