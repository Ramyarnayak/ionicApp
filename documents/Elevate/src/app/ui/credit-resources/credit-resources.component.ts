import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { KnowledgeCenter } from 'src/app/models/knowledge-center.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { MID_BLUE_DARK } from 'src/app/utils/consts.util';

@Component({
  selector: 'app-credit-resources',
  templateUrl: './credit-resources.component.html',
  styleUrls: ['./credit-resources.component.scss']
})

export class CreditResourcesComponent implements OnInit {

  @Input() knowledgeCenterId: string;
  @Input() isScore40Results: boolean;

  scrollBarThumbColor: string = MID_BLUE_DARK;

  knowledgeCenter: Observable<KnowledgeCenter>;

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnInit(): void {
    this.knowledgeCenter = this.appCommonDataService
      .getAppCommonData<KnowledgeCenter>(AppContentName.KnowledgeCenter, this.knowledgeCenterId);
  }

  getTealiumClickEvent(postTitle: string, selectedOption: string): TealiumClickEvent {
    return new TealiumClickEvent(
      `customerhub-${this.isScore40Results ? 'score40-results' : 'homepage'}-knowledgecenter`,
      selectedOption,
      postTitle
    );
  }

}
