import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterEvent
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, tap } from 'rxjs/operators';

import { MessageService } from './services/message.service';
import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { HeaderMobileNavComponent } from './ui/header-mobile-nav/header-mobile-nav.component';
import { HomeComponent } from './content/home/home.component';
import { TealiumService } from './shared/tealium/tealium.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  @ViewChild(HeaderMobileNavComponent) headerMobileNavComponent: HeaderMobileNavComponent;

  activatedComponentSubscription: Subscription;

  hideHeaderNFooter: boolean = false;

  isHomepageRoute: Observable<boolean>;

  onHomePage: boolean = false;

  subscription: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private tealiumService: TealiumService,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.subscription = this.messageService.getMessage().subscribe(message => {
      switch (message.text) {
        case MessageServiceEnum.OnHomePage:
          this.onHomePage = true;
          break;
        case MessageServiceEnum.notOnHomePage:
          this.onHomePage = false;
          break;
        case MessageServiceEnum.HideHeaderNFooter:
          this.hideHeaderNFooter = true;
          break;
        case MessageServiceEnum.ShowHeaderNFooter:
          this.hideHeaderNFooter = false;
          break;
        default: return;
      }
    });

    this.router.events
      .pipe(
        filter((event: NavigationEnd) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((navigationEndEvent: NavigationEnd[]) => {
        this.tealiumService.setTealiumData({ full_referral_url: location.origin + navigationEndEvent[0].urlAfterRedirects });

        // scrollTo TOP on any route change --excpetion is fragment URL
        if (!navigationEndEvent[1]?.urlAfterRedirects.includes('#')) {
          const appElement: Element = this.document.getElementById('App');
          appElement?.scrollTo({ top: 0 });
        }
      });
  }

  ngOnInit(): void {
    this.isHomepageRoute = this.router
      .events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map((event: RouterEvent) => event.url === '/')
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onActivate(activatedComponent: HomeComponent | Component): void {
    if (activatedComponent instanceof HomeComponent) {
      this.activatedComponentSubscription = activatedComponent.showNavMobile
        .pipe(
          tap((showNavMobile: boolean) => {
            this.headerMobileNavComponent
              .showNavMobile = showNavMobile;
          })
        )
        .subscribe();
    } else if (this.activatedComponentSubscription) {
      this.activatedComponentSubscription
        .unsubscribe();
    }
  }

  onShowNavMobile(showNavMobile: boolean): void {
    this.headerMobileNavComponent.showNavMobile = showNavMobile;
  }

}
