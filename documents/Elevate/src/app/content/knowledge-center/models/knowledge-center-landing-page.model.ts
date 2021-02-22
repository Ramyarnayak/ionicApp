import { Disclaimer } from 'src/app/models/disclaimer.model';
import { Post } from 'src/app/models/post.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { KnowledgeCenterLongArticles } from './knowledge-center-long-articles.model';
import { KnowledgeCenterMarketingBar } from './knowledge-center-marketing-bar.model';

export interface KnowledgeCenterLandingPage {
    articles: KnowledgeCenterLongArticles;
    description: string;
    disclaimer: Disclaimer;
    featuredCardArticle: Post;
    featuredHeadline: string;
    marketingBar: KnowledgeCenterMarketingBar;
    relatedArticles: Array<{ article: Post }>;
    series1: KnowledgeCenterSeriesArticles;
    series2: KnowledgeCenterSeriesArticles;
    slug: string;
    title: string;
}
