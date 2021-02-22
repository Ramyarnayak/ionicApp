import { Component, Input } from '@angular/core';

import { Score40 } from 'src/app/models/score40.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-money-mentor-cta',
  templateUrl: './money-mentor-cta.component.html',
  styleUrls: ['./money-mentor-cta.component.scss']
})
export class MoneyMentorCtaComponent {

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage', 'score40yes');

  @Input() score40: Score40;

}
