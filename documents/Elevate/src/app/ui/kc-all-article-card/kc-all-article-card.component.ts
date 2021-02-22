import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-kc-all-article-card',
  templateUrl: './kc-all-article-card.component.html',
  styleUrls: ['./kc-all-article-card.component.scss']
})
export class KcAllArticleCardComponent implements OnInit {

  @Input() post: Post;

  @Output() navigationClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
