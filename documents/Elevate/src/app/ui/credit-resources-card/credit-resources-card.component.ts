import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Post } from 'src/app/models/post.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-credit-resources-card',
  templateUrl: './credit-resources-card.component.html',
  styleUrls: ['./credit-resources-card.component.scss']
})

export class CreditResourcesCardComponent implements OnInit {

  @Input() isScore40Results: boolean;
  @Input() postNumber: number;
  @Input() reference: { post: CloudCmsContentReference };

  post: Observable<Post>;

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnInit(): void {
    this.post = this.appCommonDataService
      .getAppCommonData<Post>(AppContentName.Post, this.reference.post?.id);
  }

  getTealiumClickEvent(postTitle: string, selectedOption: string): TealiumClickEvent {
    const clickEventHome: TealiumClickEvent = new TealiumClickEvent(
      'customerhub-homepage-knowledgecenter',
      selectedOption,
      postTitle
    );

    const clickEventScore40: TealiumClickEvent = new TealiumClickEvent(
      'customerhub-score40',
      'results',
      postTitle,
      null,
      `knowledgecenter-${selectedOption}`,
      true
    );

    return this.isScore40Results ? clickEventScore40 : clickEventHome;
  }

}
