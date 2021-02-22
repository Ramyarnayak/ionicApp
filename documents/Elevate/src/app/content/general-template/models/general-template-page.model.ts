import { CustomerhubMtBody1 } from './customerhub-mt-body1.model';
import { CustomerhubMtBody2 } from './customerhub-mt-body2.model';
import { CustomerhubMtBody3 } from './customerhub-mt-body3.model';
import { CustomerhubMtMarketingBar } from './customerhub-mt-marketing-bar.model';
import { CustomerhubMtQuoteBar } from './customerhub-mt-quote-bar.model';
import { ModularTemplate } from './customerhub-mt.model';
import { JoinTeamBar } from './join-team-bar.model';
import { OurExecutives } from './our-executives.model';

export interface GeneralTemplatePage {
  customerhubmtbody1: Array<CustomerhubMtBody1>;
  customerhubmtbody2: Array<CustomerhubMtBody2>;
  customerhubmtbody3: Array<CustomerhubMtBody3>;
  ourexecutives: Array<OurExecutives>;
  customerhubmodulartemplate: Array<ModularTemplate>;
  customerhubmtjointeambar: Array<JoinTeamBar>;
  customerhubmtmarketingbar: Array<CustomerhubMtMarketingBar>;
  customerhubmtquotebar: Array<CustomerhubMtQuoteBar>;
}
