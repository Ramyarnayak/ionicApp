import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface FnSnHero {
  headline1: string;
  headline2: string;
  description: string;
  hyperlink: Navigation;
  ctaList: Array<{ cta: Navigation }>;
  settings: Settings;
}
