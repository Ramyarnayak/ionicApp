import { CloudCmsContentReference } from "src/app/models/cloud-cms-content-reference.model";
import { Navigation } from "src/app/models/navigation.model";
import { Settings } from "src/app/models/settings.model";

export interface KnowledgeCenterMarketingBar {
    id: string;
    headline1: string;
    headline2: string;
    navigation: Navigation;
    settings: Settings;
    title: string;
}