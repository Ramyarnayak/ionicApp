import { Link } from './link.model';
import { Settings } from './settings.model';

export class Navigation {
    description?: string;
    label: string;
    link: Link;
    settings: Settings;
}
