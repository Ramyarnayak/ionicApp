import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface Executive {
  executive: {
    image: CloudCmsContentReference,
    headline: string;
    description: string;
  };
}

export interface OurExecutives {
  title: string;
  executives: Array<Executive>;
  description: string;
  id: string;
}
