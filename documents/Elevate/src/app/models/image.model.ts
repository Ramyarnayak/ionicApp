import { Normal } from './normal.model';

export interface Image {
    alt: string;
    attachments?: string[];
    id: string;
    normal?: Normal;
    qname?: string;
    ref?: string;
    small?: string;
    title: string;
    typeQName?: string;
}
