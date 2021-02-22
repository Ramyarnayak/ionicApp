import { Component, Input } from '@angular/core';
import { KeyTakeaways } from '../models/key-takeaways.model';

@Component({
  selector: 'app-key-takeaways',
  templateUrl: './key-takeaways.component.html',
  styleUrls: ['./key-takeaways.component.scss']
})
export class KeyTakeawaysComponent {

  @Input() keyTakeaways: KeyTakeaways;

  constructor() { }

}
