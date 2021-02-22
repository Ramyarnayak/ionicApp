import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { take, tap } from 'rxjs/operators';

import { AppCommonData } from 'src/app/models/app-common-data.model';
import { KnowledgeCenterLongArticles } from 'src/app/content/knowledge-center/models/knowledge-center-long-articles.model';
import { Post } from 'src/app/models/post.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';

@Component({
  selector: 'app-kc-all-articles',
  templateUrl: './kc-all-articles.component.html',
  styleUrls: ['./kc-all-articles.component.scss']
})
export class KcAllArticlesComponent implements OnChanges, OnInit {

  @Input() knowledgeCenterLongArticles: KnowledgeCenterLongArticles;

  @Input() rowIndex: number;

  @Output() navigationClick: EventEmitter<{ index: number, title: string }> = new EventEmitter();

  articleStartIndex: number;

  articleEndIndex: number;

  rowLength: number = 8;

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const knowledgeCenterLongArticles: KnowledgeCenterLongArticles = changes.knowledgeCenterLongArticles
      .currentValue;

    if (knowledgeCenterLongArticles) {
      this.appCommonDataService
        .appCommonData
        .pipe(
          take(1),
          tap((appCommonData: AppCommonData) => {
            knowledgeCenterLongArticles.articles = knowledgeCenterLongArticles.articles
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

  ngOnInit(): void {
    this.setArticleStartEndIndex(
      (this.rowIndex - 1) * this.rowLength,
      (this.rowIndex * this.rowLength)
    );
  }

  loadMore(): void {
    this.setArticleStartEndIndex(this.articleStartIndex, (this.articleEndIndex + 8));
  }

  setArticleStartEndIndex(start: number, end: number): void {
    this.articleStartIndex = start;
    this.articleEndIndex = end;
  }

}
