import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Navigation } from 'src/app/models/navigation.model';

export interface SearchResultData {
  category?: CloudCmsContentReference;
  description?: string;
  id: string;
  thumbnailImage?: CloudCmsContentReference;
  title?: string;
  searchNavigation?: {
    url: string;
  };
  navigation?: Navigation;
}
