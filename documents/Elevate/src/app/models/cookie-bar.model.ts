import { Settings } from './settings.model';

export interface CookieBar {
  title: string;
  text: string;
  cta: string;
  ctaSettings: Settings;
  settings: Settings;
}
