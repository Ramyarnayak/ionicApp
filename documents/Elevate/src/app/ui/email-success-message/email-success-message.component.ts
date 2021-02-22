import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-success-message',
  templateUrl: './email-success-message.component.html',
  styleUrls: ['./email-success-message.component.scss']
})
export class EmailSuccessMessageComponent {

  // TODO:- this is temp variable, remove once integration with CMS completes
  @Input() descriptionText: string;

  constructor() { }

}
