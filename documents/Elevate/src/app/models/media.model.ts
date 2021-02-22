import { Image } from './image.model';

export class Media {
    image?: Image;
    type: 'image' |  'video';
    video?: string;
}
