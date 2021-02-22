import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NoOfferError } from '../models/no-offer-error.model';

@Component({
  selector: 'app-no-offer-error',
  templateUrl: './no-offer-error.component.html',
  styleUrls: ['./no-offer-error.component.scss']
})
export class NoOfferErrorComponent implements OnInit {

  @Input() noOfferError: NoOfferError;

  @Output() tealiumClickEvent: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
