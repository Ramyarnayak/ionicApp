import {
  animate,
  style,
  trigger,
  transition
} from '@angular/animations';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  fromEvent,
  Observable,
  Subscription
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs/operators';

import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { AppCommonData } from 'src/app/models/app-common-data.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { HeaderNavigationItem, TertiaryNavigationItem } from 'src/app/models/header-new.model';
import { Navigation } from 'src/app/models/navigation.model';
import { MOBILE_MAX_BREAK_POINT, MOBILE_HEADER_HEIGHT } from 'src/app/utils/consts.util';
import { HeaderMobileNavListComponent } from '../header-mobile-nav-list/header-mobile-nav-list.component';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MessageServiceEnum } from 'src/app/enums/message-service.enum';

const animationTiming: string = '400ms ease-out';

@Component({
  animations: [
    trigger('showHideNavMobile', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(animationTiming, style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate(animationTiming, style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ],
  selector: 'app-header-mobile-nav',
  templateUrl: './header-mobile-nav.component.html',
  styleUrls: ['./header-mobile-nav.component.scss']
})
export class HeaderMobileNavComponent implements OnDestroy, OnInit {

  @ViewChildren(HeaderMobileNavListComponent) navLists: QueryList<HeaderMobileNavListComponent>;

  bottomNavigation: Observable<Array<HeaderNavigationItem>>;

  headerNavigationItems: Observable<Array<HeaderNavigationItem>>;

  showNavMobile: boolean = false;

  showSearchInput: boolean = false;

  searchString: string;

  showNavMobileTertiary: boolean = false;

  tertiaryNavigationList: Array<TertiaryNavigationItem>;

  private subscriptions: Array<Subscription> = [];

  constructor(private appCommonDataService: AppCommonDataService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.bottomNavigation = this.appCommonDataService
      .appCommonData
      .pipe(map((appCommonData: AppCommonData) => {
        return appCommonData.header
          .bottomNavigation
          .map((bottomNavigation: { navigation: Navigation }) => {
            return {
              headerHero: null,
              id: null,
              isOpen: false,
              navigation: {
                ...bottomNavigation.navigation
              },
              secondaryNavigation: [],
              title: null
            };
          });
      }));

    this.headerNavigationItems = this.appCommonDataService
      .appCommonData
      .pipe(map((appCommonData: AppCommonData) => {
        return appCommonData.header
          .headerNavigation
          .map((itemReference: { headerNavigationItem: CloudCmsContentReference }) => {
            return appCommonData.headernavigationitem
              .find((headerNavigationItem: HeaderNavigationItem) => headerNavigationItem.id === itemReference.headerNavigationItem.id);
          });
      }));

    // Observe viewport width changes and close the mobile header when switching to desktop
    this.subscriptions
      .push(fromEvent(window, 'resize')
        .pipe(
          map((event: Event) => {
            const window: Window = event.target as Window;

            return window.innerWidth;
          }),
          startWith(0),
          distinctUntilChanged(),
          debounceTime(250)
        )
        .subscribe((viewportWidth: number) => viewportWidth < MOBILE_MAX_BREAK_POINT || this.onHideNavMobile()));
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  onHideNavMobile(): void {
    this.navLists.forEach((navList: HeaderMobileNavListComponent) => {
      navList.accordion
        .closeAll();
    });
    this.showNavMobile = false;
    this.showNavMobileTertiary = false;
    this.showSearchInput = false;
  }

  onHideTertiaryNavMobile(): void {
    this.showNavMobileTertiary = false;
  }

  onShowNavMobileTertiary(tertiaryNavigationList: Array<TertiaryNavigationItem>): void {
    this.tertiaryNavigationList = tertiaryNavigationList;
    this.showNavMobileTertiary = true;
  }

  showSearch(): void {
    this.showSearchInput = true;
  }

  updateSearchString(str: string): void {
    this.searchString = str;
  }

  performSearch(): void {
    this.messageService.sendMessageWithValue(MessageServiceEnum.searchString, this.searchString);
    this.router.navigateByUrl('/search');
  }

  performSearchOnEnter(str: string): void {
    this.messageService.sendMessageWithValue(MessageServiceEnum.searchString, str);
    this.router.navigateByUrl('/search');
  }

}
