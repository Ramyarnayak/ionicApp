import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { tap, take } from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { Post } from 'src/app/models/post.model';
import { KnowledgeCenterSeriesArticles } from 'src/app/shared/models/knowledge-center-series-articles.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';

@Component({
  selector: 'app-kc-series-articles',
  templateUrl: './kc-series-articles.component.html',
  styleUrls: ['./kc-series-articles.component.scss']
})
export class KcSeriesArticlesComponent implements OnChanges {

  @Input() knowledgeCenterSeriesArticles: KnowledgeCenterSeriesArticles;

  @Output() navigationClick: EventEmitter<{ index: number, title: string }> = new EventEmitter();

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const knowledgeCenterSeriesArticles: KnowledgeCenterSeriesArticles = changes.knowledgeCenterSeriesArticles
      .currentValue;

    if (knowledgeCenterSeriesArticles) {
      this.appCommonDataService
        .appCommonData
        .pipe(
          take(1),
          tap((appCommonData: AppCommonData) => {
            knowledgeCenterSeriesArticles.articles = knowledgeCenterSeriesArticles.articles
              .map((article: { article: Post }) => {
                return {
                  article: appCommonData.post
                    .find((post: Post) => post.id === article.article.id)
                };
              });
          })
        )
        .subscribe();
    }
  }

}
