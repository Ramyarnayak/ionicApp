import { SafeHtml } from '@angular/platform-browser';
import { Navigation } from '../../../models/navigation.model';
import { Settings } from '../../../models/settings.model';

export interface Commit {
  title: string;
  description: string;
}

export interface Commitment {
  commitment: Commit;
}

export interface OurCommitment {
  title: string;
  headline: string | SafeHtml;
  subheading: string;
  commitmentList: Commitment[];
  navigation?: Navigation;
  settings?: Settings;
}
