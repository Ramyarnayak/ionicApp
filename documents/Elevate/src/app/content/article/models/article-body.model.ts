import { ArticleSection } from './article-section.model';

export interface ArticleBody {
  id: string;
  sections: Array<{ section: ArticleSection }>;
  title: string;
}
