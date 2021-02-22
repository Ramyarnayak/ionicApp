import { Settings } from 'src/app/models/settings.model';

export interface Score40CloseResults {
  title: string;
  headline: string;
  subheading: string;
  optOutText: string;
  leaveCta: string;
  saveCta: string;
  saveCtaSettings: Settings;
  settings: Settings;
  id: string;
}
