import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Settings } from 'src/app/models/settings.model';

export interface CustomerhubMtBody3 {
  title: string;
  text1: string;
  text2: string;
  ourexecutives: CloudCmsContentReference;
  settings: Settings;
  id: string;
}
