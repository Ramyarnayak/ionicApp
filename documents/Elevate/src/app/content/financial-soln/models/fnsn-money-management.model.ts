import { Settings } from 'src/app/models/settings.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { FnSnMoneyManagementCard } from './fnsn-money-management-card.model';

export interface FnSnMoneyManagement {
    description: string;
    hashTag: string;
    headline: string;
    moneyManagementCards: Array<{ moneyManagementCard: CloudCmsContentReference }>;
    moneyManagementCardItems?: Array<FnSnMoneyManagementCard>;
    settings: Settings;
}
