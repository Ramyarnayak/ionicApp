import { KnowledgeCenterArticle } from '../../article/models/knowledge-center-article.model';
import { KnowledgeCenterFeaturedArticles } from './knowledge-center-featured-articles.model';
import { KnowledgeCenterHero } from './knowledge-center-hero.model';
import { KnowledgeCenterHeroCard } from './knowledge-center-hero-card.model';
import { KnowledgeCenterLandingPage } from './knowledge-center-landing-page.model';
import { KnowledgeCenterPage } from './knowledge-center-page.model';
import { KnowledgeCenterLongArticles } from './knowledge-center-long-articles.model';
import { KnowledgeCenterSeriesArticles } from '../../../shared/models/knowledge-center-series-articles.model';
import { KnowledgeCenterMarketingBar } from './knowledge-center-marketing-bar.model';

export interface KnowledgeCenter {
    knowledgecenterarticle: Array<KnowledgeCenterArticle>,
    knowledgecenterfeaturedarticles: Array<KnowledgeCenterFeaturedArticles>;
    knowledgecenterhero: Array<KnowledgeCenterHero>;
    knowledgecenterherocard: Array<KnowledgeCenterHeroCard>;
    knowledgecenterlandingpage: Array<KnowledgeCenterLandingPage>;
    knowledgecenterlongarticles: Array<KnowledgeCenterLongArticles>;
    knowledgecentermarketingbar: Array<KnowledgeCenterMarketingBar>;
    knowledgecenterseriesarticles: Array<KnowledgeCenterSeriesArticles>;
    knowledgecenterpage: Array<KnowledgeCenterPage>;
}
