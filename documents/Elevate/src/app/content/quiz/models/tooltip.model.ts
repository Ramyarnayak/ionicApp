import { SafeHtml } from '@angular/platform-browser';

export interface Tooltip {
    tooltip: string;
    body: string | SafeHtml;
}
