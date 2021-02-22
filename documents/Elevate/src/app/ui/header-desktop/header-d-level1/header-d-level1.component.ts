import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { Header, HeaderNavigationItem } from 'src/app/models/header-new.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { MessageService } from '../../../services/message.service';
import { HeaderDLevel2Component } from '../header-d-level2/header-d-level2.component';
import { HeaderDLevel3Component } from '../header-d-level3/header-d-level3.component';
import { HeaderDSearchComponent } from '../header-d-search/header-d-search.component';

@Component({
  selector: 'app-header-d-level1',
  templateUrl: './header-d-level1.component.html',
  styleUrls: ['./header-d-level1.component.scss']
})
export class HeaderDLevel1Component {

  @Input() header: Header;

  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @ViewChild('headerDLevel2', { read: ViewContainerRef }) container: ViewContainerRef;

  componentRef: ComponentRef<any>;

  mouseOverIndex: number = -1;

  mouseOverSubMenu: boolean = false;

  subscription: Subscription;

  headerSecondaryNavigation: HeaderNavigationItem;

  constructor(
    private messageService: MessageService,
    public resolver: ComponentFactoryResolver
  ) {
      this.subscription = this.messageService
        .getMessage()
        .subscribe((message: { text: string, value: any }) => {
          switch(message.text) {
            case MessageServiceEnum.onClickSubMenu:
              this.onSubMenuClicked(message.value);
              break;
            case MessageServiceEnum.onGoBackClick:
              this.onMouseOver(-1);
              break;
            default: return;
          }
        });
  }

  onCloseClick(): void {
    this.closeClicked.emit(true);
  }

  onMouseOver(index: number): void {
    this.container.clear();
    if (index > -1) {
      this.mouseOverIndex = index;
    }
    if (this.header && this.header[this.mouseOverIndex]?.secondaryNavigation.length && this.header[this.mouseOverIndex]?.title.toLowerCase() !== "search") {
      const factory: ComponentFactory<HeaderDLevel2Component> = this.resolver
        .resolveComponentFactory(HeaderDLevel2Component);

      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.headerSecondaryNavigation = this.header[this.mouseOverIndex];
    } else if (this.header && this.header[this.mouseOverIndex]?.title.toLowerCase() === "search") {
      const factory: ComponentFactory<HeaderDSearchComponent> = this.resolver
        .resolveComponentFactory(HeaderDSearchComponent);

      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.headerSecondaryNavigation = this.header[this.mouseOverIndex];
    }
    this.mouseOverSubMenu = true;
  }

  onMouseLeave(): void {
      this.mouseOverSubMenu = false;
  }

  onMouseOverSubMenu(): void {
    this.mouseOverSubMenu = true;
  }

  onMouseLeaveSubMenu(): void {
    this.mouseOverSubMenu = false;
    this.container.clear();
  }

  onSubMenuClicked(index: number): void {
    this.container.clear();
    if (this.header && this.header[this.mouseOverIndex]?.secondaryNavigation[index].tertiaryNavigation.length) {
      const factory: ComponentFactory<HeaderDLevel3Component> = this.resolver
        .resolveComponentFactory(HeaderDLevel3Component);

      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.headerTertiaryNavigation = this.header[this.mouseOverIndex].secondaryNavigation[index];
    }
    this.mouseOverSubMenu = false;
    this.closeClicked.emit(true);
  }

  getTealiumClickEvent(headerTitle: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-header', headerTitle);
  }

}
