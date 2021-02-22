import { Footer } from './footer';
import { FooterMenuItem } from './footer-menu-item';
import { FooterSubMenu } from './footer-sub-menu';

export interface FooterNavigation {
    columnOrder: number;
    menuItem: FooterMenuItem;
    submenu: FooterSubMenu[];
}
