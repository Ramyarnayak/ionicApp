import { CloudCmsContentReference } from './cloud-cms-content-reference.model';
import { Navigation } from './navigation.model';

export interface Post {
    article: CloudCmsContentReference;
    attachments: string[];
    category: CloudCmsContentReference;
    description: string;
    id: string;
    navigation: Navigation;
    slug: string;
    summary: string;    // rich text
    thumbnailImage: CloudCmsContentReference;
    title: string;
}
