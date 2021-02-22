import { Image } from '../../../models/image.model';
import { Navigation } from '../../../models/navigation.model';

export interface Score40ResultsCarouselItem {
    category: string;
    cta: Navigation;
    description: string;
    id: string;
    image?: Image;
}
