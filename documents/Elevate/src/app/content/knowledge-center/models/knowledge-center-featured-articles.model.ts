import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Post } from 'src/app/models/post.model';
import { Settings } from 'src/app/models/settings.model';

export interface KnowledgeCenterFeaturedArticles {
    cards: Array<{ card: CloudCmsContentReference }>;
    headline: string;
    id: string;
    posts?: Array<Post>;
    settings: Settings;
    type: 'long_article' | 'series_article';
}
