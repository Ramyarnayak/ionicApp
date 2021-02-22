import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface KnowledgeCenterPage {
    disclaimer: CloudCmsContentReference;
    featuredArticles: CloudCmsContentReference;
    hero: CloudCmsContentReference;
    loadMoreCta: string;
}
