import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { TealiumClickEvent } from '../../shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent {

  @Output() showNavMobile: EventEmitter<boolean> = new EventEmitter();

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage', 'header');

  onShowNavMobile(): void {
    this.showNavMobile
      .emit(true);
  }

}
