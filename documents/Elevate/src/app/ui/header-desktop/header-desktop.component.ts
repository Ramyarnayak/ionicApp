import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { HeaderNavigationItem } from 'src/app/models/header-new.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-header-d',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
})
export class HeaderDesktopComponent implements OnInit {

  @Input() theme: string;

  headerNavigationItems: Observable<Array<HeaderNavigationItem>>;

  headerLevel1Flag: boolean = false;

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage', 'header');

  constructor(private appCommonDataService: AppCommonDataService,
    private router: Router) { }

  ngOnInit(): void {
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
  }

  openHeader(): void {
    this.headerLevel1Flag = true;
  }

  onCloseClicked(): void {
    this.headerLevel1Flag = false;
  }

  setElevateLogoType(): string {
    if (this.router.url === "/") {
      return 'assets/elevate-logo.png';
    } else {
      return this.theme === 'white' ? 'assets/elevate-logo.png' : 'assets/elevate-logo-blue.png';
    }
  }

}
