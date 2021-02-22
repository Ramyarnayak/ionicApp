import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Settings } from 'src/app/models/settings.model';
import { Tooltip } from './tooltip.model';

export interface Score40Question {
  goBackCta: string;
  id: string;
  nextCta: Settings;
  options: Array<{ option: CloudCmsContentReference }>;
  quizBreakdownTabName: string;
  question: string;
  title: string;
  tooltip: Tooltip;
}
