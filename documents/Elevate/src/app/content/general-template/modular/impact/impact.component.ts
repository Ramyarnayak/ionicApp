import { Component, Input } from '@angular/core';
import { ImpactBarItem } from '../../models/customerhub-mt-body2.model';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class ImpactComponent {

  @Input() impactBarHeadline: string;

  @Input() impactBarItems: Array<{item: ImpactBarItem}>;

  constructor() { }


}
