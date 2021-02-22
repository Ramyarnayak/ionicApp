import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { TertiaryNavigationItem } from '../../models/header-new.model';

@Component({
  selector: 'app-header-mobile-nav-tertiary',
  templateUrl: './header-mobile-nav-tertiary.component.html',
  styleUrls: ['./header-mobile-nav-tertiary.component.scss'],
})
export class HeaderMobileNavTertiaryComponent {

  @Input() tertiaryNavigationList: Array<TertiaryNavigationItem>;

  @Output() closeTertiaryNav: EventEmitter<null> = new EventEmitter<null>();

}
