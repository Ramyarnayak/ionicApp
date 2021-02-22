import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface Score40ResultsHero {
  headline1: string;
  headline2: string;
  headline3: string;
  subheading: string;
  tooltip: { tooltip: string };
  settings: Settings;
  restartCta: Navigation;
}
