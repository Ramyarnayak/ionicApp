import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-article-feedback',
  templateUrl: './article-feedback.component.html',
  styleUrls: ['./article-feedback.component.scss']
})
export class ArticleFeedbackComponent {

  @Input() feedbackBarHeadline: string;

  @Output() feedbackClick: EventEmitter<string> = new EventEmitter();

  currentState: string = '';

  onIconClick(state: string): void {
    this.currentState = state;
    this.feedbackClick
      .emit(state);
  }

}
