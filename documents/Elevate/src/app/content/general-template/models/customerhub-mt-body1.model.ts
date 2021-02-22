import { Settings } from 'src/app/models/settings.model';
import { CustomerhubMtBody1Card } from './customerhub-mt-body1-card.model';

export interface CustomerhubMtBody1 {
  title: string;
  headline: string;
  description: string;
  cards: Array<{ card: CustomerhubMtBody1Card }>;
  settings: Settings;
  id: string;
}
