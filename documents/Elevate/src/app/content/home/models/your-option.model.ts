import { Navigation } from '../../../models/navigation.model';
import { Settings } from '../../../models/settings.model';

export class YourOption {
    option: {
        description: string;
        headline: string;
        settings: Settings;
        navigation: Navigation;
    };
}
