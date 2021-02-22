import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { HeaderNavigationItem } from 'src/app/models/header-new.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header-d-search',
  templateUrl: './header-d-search.component.html',
  styleUrls: ['./header-d-search.component.scss']
})
export class HeaderDSearchComponent {

  mouseOverSubMenuList: boolean = false;

  headerSecondaryNavigation: HeaderNavigationItem;

  searchInputClicked: boolean = false;

  searchString: string;

  constructor(private router: Router,
    private messageService: MessageService) { }

  onMouseLeave(): void {
    this.mouseOverSubMenuList = false;
  }

  onMouseOver(): void {
    this.mouseOverSubMenuList = true;
  }

  onSearchInputFocus(): void {
    this.searchInputClicked = true;
  }

  performSearch(): void {
    this.messageService.sendMessageWithValue(MessageServiceEnum.searchString, this.searchString);
    this.router.navigateByUrl('/search');
  }

  performSearchOnEnter(str: string): void {
    this.messageService.sendMessageWithValue(MessageServiceEnum.searchString, str);
    this.router.navigateByUrl('/search');
  }

  updateSearchString(str: string): void {
    this.searchString = str;
  }

}
