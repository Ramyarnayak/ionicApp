import { Component, Input } from '@angular/core';

import { Commitment } from '../../models/our-commitment.model';

@Component({
  selector: 'app-credit-bor-card',
  templateUrl: './credit-bor-card.component.html',
  styleUrls: ['./credit-bor-card.component.scss']
})
export class CreditBORCardComponent {
  @Input() index: string;
  @Input() commitment: Commitment;

  constructor() { }

}
