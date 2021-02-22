import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from 'src/app/models/post.model';
import { isMobile } from 'src/app/utils/is-mobile-observable.util';

@Component({
  selector: 'app-kc-article-card',
  templateUrl: './kc-article-card.component.html',
  styleUrls: ['./kc-article-card.component.scss']
})
export class KcArticleCardComponent {

  @Input() post: Post;

  @Output() navigationClick: EventEmitter<string> = new EventEmitter();

  isMobile: Observable<boolean> = isMobile;

  constructor() { }

}
