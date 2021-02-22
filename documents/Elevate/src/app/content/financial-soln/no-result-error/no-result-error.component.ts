import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoResultError } from '../models/no-result-error.model';

@Component({
  selector: 'app-no-result-error',
  templateUrl: './no-result-error.component.html',
  styleUrls: ['./no-result-error.component.scss']
})
export class NoResultErrorComponent {

  @Input() noResultError: NoResultError;

  @Output() hasCtaClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onCtaClick(): void {
    this.hasCtaClicked.emit(true);
  }

}
