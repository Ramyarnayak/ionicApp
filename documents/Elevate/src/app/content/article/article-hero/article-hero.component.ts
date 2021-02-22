import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { AppCommonData } from 'src/app/models/app-common-data.model';
import { Image } from 'src/app/models/image.model';
import { Post } from 'src/app/models/post.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { ArticleHero } from '../models/article-hero.model';


@Component({
  selector: 'app-article-hero',
  templateUrl: './article-hero.component.html',
  styleUrls: ['./article-hero.component.scss']
})
export class ArticleHeroComponent implements OnChanges, OnInit {

  @Input() articleHero: ArticleHero;

  @Input() post: Post;

  articleHeroImage: Observable<Image>;

  href: string = '';

  private tealiumEventCategory: string = 'customerhub-knowledgecenter';

  private tealiumEventName: string = 'article';

  constructor(private appCommonDataService: AppCommonDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.articleHero?.currentValue) {
      this.articleHeroImage = this.appCommonDataService
        .appCommonData
        .pipe(map((appCommonData: AppCommonData) => appCommonData.image
          .find((image: Image) => image.id === changes.articleHero.currentValue.image.id)));
    }
  }

  ngOnInit(): void {
    this.href = window.location.href;
  }

  getTealiumClickEventSocial(socialName: string): TealiumClickEvent {
    return new TealiumClickEvent(
      this.tealiumEventCategory,
      this.tealiumEventName,
      this.post?.title,
      null,
      socialName
    );
  }
}
