import { Post } from 'src/app/models/post.model';
import { Settings } from 'src/app/models/settings.model';

export interface KnowledgeCenterLongArticles {
    title: string;
    headline: string;
    articles: Array<{ article: Post }>;
    loadMoreCta: string;
    settings: Settings;
    id: string;
}