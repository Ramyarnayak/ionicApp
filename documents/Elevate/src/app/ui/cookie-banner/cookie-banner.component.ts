import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { CookieBar } from 'src/app/models/cookie-bar.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})

export class CookieBannerComponent implements OnInit {

  allowCookies: boolean;
  cookieBarData: Observable<CookieBar>;

  @ViewChild('cookieBannerTextRef') cookieBannerTextRef: ElementRef;

  constructor(
    private appCommonDataService: AppCommonDataService,
    private renderer: Renderer2,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.allowCookies = JSON.parse(localStorage.getItem('allowCookies'));
    this.cookieBarData = this.appCommonDataService
      .getAppCommonData<CookieBar>(AppContentName.CookieBar);
  }

  setLocalStorageForStoringCookies(): void {
    this.allowCookies = true;
    localStorage.setItem('allowCookies', JSON.stringify(this.allowCookies));
  }

  get tealiumClickEventSend(): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-cookiesbanner', 'gotit');
  }

  onCookieBannerTextRender(): void {
    const anchorTags: Array<HTMLElement> = this.cookieBannerTextRef?.nativeElement.querySelectorAll('a');

    anchorTags
      ?.forEach((anchorTag: HTMLElement) => {
        this.renderer
          .listen(anchorTag, 'click', () => {
            this.tealiumService
              .clickEvent(
                new TealiumClickEvent(
                  'customerhub-cookiesbanner',
                  'content',
                  anchorTag?.getAttribute('href')
                )
              );
          });
        this.renderer.setStyle(anchorTag, 'text-decoration', 'none');
      });
  }

}
