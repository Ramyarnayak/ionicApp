import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { KnowledgeCenterMarketingBar } from '../models/knowledge-center-marketing-bar.model';

@Component({
  selector: 'app-kc-marketing-bar',
  templateUrl: './kc-marketing-bar.component.html',
  styleUrls: ['./kc-marketing-bar.component.scss']
})
export class KcMarketingBarComponent {

  @Input() marketingBar: KnowledgeCenterMarketingBar;

  @Output() navigationClick: EventEmitter<null> = new EventEmitter();

}
