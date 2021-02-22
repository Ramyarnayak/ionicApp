import { CaptureEmailCardModel } from 'src/app/shared/models/capture-email-card.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { ArticleBody } from './article-body.model';
import { ArticleHero } from './article-hero.model';
import { KeyTakeaways } from './key-takeaways.model';
import { KnowledgeCenterArticleFeedbackBar } from './knowledge-center-article-feedback-bar.model';
import { KnowledgeCenterLongArticles } from './knowledge-center-long-articles.model';

export interface KnowledgeCenterArticle {
    articleBody: ArticleBody;
    articleHero: ArticleHero;
    articleType: 'long_article' | 'series_article';
    emailBar: CaptureEmailCardModel;
    feedbackBar: KnowledgeCenterArticleFeedbackBar;
    id: string;
    keyTakeaways?: KeyTakeaways;
    relatedArticles: KnowledgeCenterLongArticles;
    seriesArticles ?: KnowledgeCenterSeriesArticles;
    tableOfContents: string;    // rich text
}
