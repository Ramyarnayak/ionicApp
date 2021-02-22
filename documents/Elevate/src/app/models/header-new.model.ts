import { CloudCmsContentReference } from './cloud-cms-content-reference.model';
import { Image } from './image.model';
import { Navigation } from './navigation.model';

export interface HeaderHero {
  title: string;
  heading: string;
  image: Image;
  navigation: Navigation;
}

export interface HeroNavigation {
  description: string;
  label: string;
  navigation: Navigation;
}

export interface TertiaryNavigationItem {
  navigationBlock: Navigation;
}

export interface SecondaryNavigationItem {
  heroNavigation: HeroNavigation;
  navigation: Navigation;
  tertiaryNavigation: Array<TertiaryNavigationItem>;
}

export interface HeaderNavigationItem {
  headerHero: HeaderHero;
  id: string;
  isOpen?: boolean;
  navigation: Navigation;
  secondaryNavigation: Array<SecondaryNavigationItem>;
  title: string;
}

export interface Header {
  bottomNavigation: Array<{ navigation: Navigation }>;
  headerNavigation: Array<{ headerNavigationItem: CloudCmsContentReference }>;
  id: string;
}
