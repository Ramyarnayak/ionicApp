import { Settings } from 'src/app/models/settings.model';

export interface ImpactBarItem {
  headline: string;
  subheading: string;
}

export interface CustomerhubMtBody2 {
  title: string;
  headline: string;
  description1: string;
  description2: string;
  impactBarHeadline: string;
  impactBarItems: Array<{ item: ImpactBarItem }>;
  settings: Settings;
  id: string;
}
