import { Component } from '@angular/core';

import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { HeaderNavigationItem } from 'src/app/models/header-new.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-header-d-level2',
  templateUrl: './header-d-level2.component.html',
  styleUrls: ['./header-d-level2.component.scss']
})
export class HeaderDLevel2Component {

  mouseOverSubMenuList: boolean = false;

  headerSecondaryNavigation: HeaderNavigationItem;

  constructor(private messageService: MessageService) { }

  onClickSubMenu(index: number): void {
    this.messageService.sendMessageWithValue(MessageServiceEnum.onClickSubMenu, index);
  }

  onMouseLeave(): void {
    this.mouseOverSubMenuList = false;
  }

  onMouseOver(): void {
    this.mouseOverSubMenuList = true;
  }

  getTealiumClickEvent(navigationCategory: string, navigationLabel: string): TealiumClickEvent {
    return new TealiumClickEvent(navigationCategory, navigationLabel, '', 'customerhub-header');
  }

}
