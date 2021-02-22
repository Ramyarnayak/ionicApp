import { SafeHtml } from '@angular/platform-browser';

import { YourOption } from './your-option.model';

export class YourOptions {
    headline: string | SafeHtml;
    optionList: Array<YourOption>;
    subheading: string;
}
