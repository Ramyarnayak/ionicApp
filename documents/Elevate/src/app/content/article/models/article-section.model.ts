import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface ArticleSection {
    body: string;
    bodyType: 'default' | 'text_with_bottom_media' | 'text_with_top_media' | 'text_with_left_media' | 'text_with_right_media';
    caption: string;
    hashtag: string;
    media: { type: string; image: CloudCmsContentReference };
    mediaBottomText: string;
  }
