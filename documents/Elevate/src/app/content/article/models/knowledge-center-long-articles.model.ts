import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Settings } from 'src/app/models/settings.model';

export interface Article {
  article: CloudCmsContentReference;
}

export interface KnowledgeCenterLongArticles {
  title: string;
  headline: string;
  articles: Array<Article>;
  loadMoreCta: string;
  settings: Settings;
  id: string;
}
