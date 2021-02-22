import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface ModularTemplate {
  body1: CloudCmsContentReference;
  body3: CloudCmsContentReference;
  heroHeadline: string;
  heroImage: CloudCmsContentReference;
  id: string;
  marketingBar: CloudCmsContentReference;
  quoteBar: CloudCmsContentReference;
  title: string;
}
