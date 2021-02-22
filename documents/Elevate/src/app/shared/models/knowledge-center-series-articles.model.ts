import { Post } from 'src/app/models/post.model';
import { Settings } from 'src/app/models/settings.model';

export interface KnowledgeCenterSeriesArticles {
    articles: Array<{ article: Post }>;
    description: string;
    headline1: string;
    headline2: string;
    id: string;
    settings: Settings;
    title: string;
}
