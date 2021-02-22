import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

import { Link } from '../../models/link.model';
import { HeaderNavigationItem, TertiaryNavigationItem } from '../../models/header-new.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-header-mobile-nav-list',
  templateUrl: './header-mobile-nav-list.component.html',
  styleUrls: ['./header-mobile-nav-list.component.scss']
})
export class HeaderMobileNavListComponent {

  @Input() headerNavigationItemList: Array<HeaderNavigationItem>;

  @Input() showLastItemBottomBorder: boolean = true;

  @Output() closeNav: EventEmitter<null> = new EventEmitter<null>();

  @Output() showNavMobileTertiary: EventEmitter<Array<TertiaryNavigationItem>> = new EventEmitter<Array<TertiaryNavigationItem>>();

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private router: Router) { }

  onNavigate(link: Link, secondaryNavigationList?: Array<TertiaryNavigationItem>): void {
    if (secondaryNavigationList && secondaryNavigationList.length) {
      this.showNavMobileTertiary.emit(secondaryNavigationList);
    } else if (link?.internalLink) {
      this.router.navigateByUrl(link.internalLink);
      this.closeNav.emit();
    } else if (link?.externalLink) {
      window.open(link.externalLink, '_blank');
    }
  }

  getTealiumClickEvent(levelOneTitle: string, levelTwoTitle: string): TealiumClickEvent {
    return levelTwoTitle ?
      new TealiumClickEvent(levelOneTitle, levelTwoTitle, '', 'customerhub-header')
      : new TealiumClickEvent('customerhub-header', levelOneTitle);
  }

}
