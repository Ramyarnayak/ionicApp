import {
  Directive,
  HostListener,
  Input
} from '@angular/core';

import { TealiumClickEvent } from '../models/tealium-click-event.model';
import { TealiumService } from '../tealium.service';

@Directive({
  selector: '[appTealiumClickEvent]'
})
export class TealiumClickEventDirective {

  @Input('appTealiumClickEvent') clickEvent: TealiumClickEvent;

  constructor(private tealiumService: TealiumService) { }

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.clickEvent) {
      this.tealiumService
        .clickEvent(this.clickEvent);
    }
  }

}
