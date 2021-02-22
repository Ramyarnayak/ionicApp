import { SafeHtml } from '@angular/platform-browser';

export interface ScreenLoading {
    title: string;
    copy: SafeHtml;
    disclaimer: {
        id: string;
        title: string;
    };
}
