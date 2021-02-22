import { Component, Input } from '@angular/core';

import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { SecondaryNavigationItem } from 'src/app/models/header-new.model';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-header-d-level3',
  templateUrl: './header-d-level3.component.html',
  styleUrls: ['./header-d-level3.component.scss']
})
export class HeaderDLevel3Component {
  @Input() mouseOverIndex: number;
  mouseOverSubMenuList: Boolean = false;

  headerTertiaryNavigation: SecondaryNavigationItem;

  constructor(private messageService: MessageService) { }

  onMouseOver() {
    this.mouseOverSubMenuList = true;
  }

  onMouseLeave() {
    this.mouseOverSubMenuList = false;
  }

  onGoBackClick() {
    this.messageService.sendMessage(MessageServiceEnum.onGoBackClick);
  }

}
