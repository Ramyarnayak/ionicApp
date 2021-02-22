import { Component, Input } from '@angular/core';

import { ArticleBody } from '../models/article-body.model';

@Component({
  selector: 'app-article-body',
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.scss']
})

export class ArticleBodyComponent {

  @Input() articleBody: ArticleBody;

  removeHash(withHash: string = ''): string {
    return withHash.replace(/\#(.*)/, '$1');
  }

}
