import { Component, Input } from '@angular/core';

import { TealiumClickEvent } from '../../../shared/tealium/models/tealium-click-event.model';
import { ImprovingSection } from '../models/improving-section';

@Component({
  selector: 'app-start-your-climb-tile',
  templateUrl: './start-your-climb-tile.component.html',
  styleUrls: ['./start-your-climb-tile.component.scss']
})
export class StartYourClimbTileComponent {

  @Input() data: ImprovingSection;

  constructor() { }

  getTealiumClickEvent(sectionNavigationLabel: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-homepage-improving', sectionNavigationLabel);
  }

}
