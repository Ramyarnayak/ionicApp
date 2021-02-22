import { FooterNavigationList } from './footer-navigation-list';
import { Settings } from './settings.model';
import { SocialMediaList } from './social-media-list.model';

export interface Footer {
    title: string;
    primaryNavigationList: FooterNavigationList;
    secondaryNavigationList: FooterNavigationList;
    moneyManagementDisclosure: string;
    lendingProductsDisclosure: string;
    socialMediaList: SocialMediaList[];
    settings: Settings;
}
