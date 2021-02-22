import { Image } from 'src/app/models/image.model';
import { Settings } from 'src/app/models/settings.model';

export interface ArticleHero {
    caption: string;
    date: string;
    image: Image;
    readTime: string;
    seriesHeadline1?: string;
    seriesHeadline2?: string;
    seriesHeadline2Settings: Settings;
}
