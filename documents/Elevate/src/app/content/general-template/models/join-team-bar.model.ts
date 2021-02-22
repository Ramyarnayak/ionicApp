import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Settings } from 'src/app/models/settings.model';

export interface JoinTeamBar {
  title: string,
  headline: string,
  description: string,
  image: CloudCmsContentReference,
  cta: Navigation,
  settings: Settings
}
