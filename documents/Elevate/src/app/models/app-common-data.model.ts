import { Disclaimer } from './disclaimer.model';
import { Header, HeaderNavigationItem } from './header-new.model';
import { Image } from './image.model';
import { Post } from './post.model';

export interface AppCommonData {
    disclaimer: Array<Disclaimer>;
    header: Header;
    headernavigationitem: Array<HeaderNavigationItem>;
    image: Array<Image>;
    post: Array<Post>;
}
