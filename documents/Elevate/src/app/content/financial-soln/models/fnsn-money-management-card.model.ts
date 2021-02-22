import { Image } from 'src/app/models/image.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Ratings } from './ratings.model';

export interface FnSnMoneyManagementCard {
    body1: string;
    body2: string;
    cta: Navigation;
    headline: string;
    id: string;
    logo: Image;
    ratings: Ratings;
}
