import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
 } from '@angular/core';

import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { FnSnHero } from '../models/fnsn-hero.model';
import { FnSnModel } from '../models/fnsn.model';

@Component({
  selector: 'app-fnsn-hero',
  templateUrl: './fnsn-hero.component.html',
  styleUrls: ['./fnsn-hero.component.scss']
})
export class FnSnHeroComponent implements OnChanges {
  @Input() financialSolution: FnSnModel;

  fnsnHero: FnSnHero;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.financialSolution.currentValue) {
      const currentValue: FnSnModel = changes.financialSolution
        .currentValue;

      this.fnsnHero = currentValue.financialsolutionhero[0];
    }
  }

  getTealiumClickEvent(eventName: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-financialsolutions', eventName);
  }

}
