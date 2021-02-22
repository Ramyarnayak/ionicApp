import { CaptureEmailCardModel } from 'src/app/shared/models/capture-email-card.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { ArticleBody } from './article-body.model';
import { KnowledgeCenterArticleFeedbackBar } from './knowledge-center-article-feedback-bar.model';
import { KnowledgeCenterArticle } from './knowledge-center-article.model';
import { KnowledgeCenterLongArticles } from './knowledge-center-long-articles.model';

export interface ArticlePage {
  knowledgecenterarticle: Array<KnowledgeCenterArticle>;
  knowledgecenterarticleemailbar: Array<CaptureEmailCardModel>;
  knowledgecenterarticlefeedbackbar: Array<KnowledgeCenterArticleFeedbackBar>;
  knowledgecenterlongarticles: Array<KnowledgeCenterLongArticles>;
  knowledgecenterseriesarticles: Array<KnowledgeCenterSeriesArticles>;
  knowledgecenterarticlebody: Array<ArticleBody>;
}
