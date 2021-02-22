import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { CustomerhubMtMarketingBar } from '../../models/customerhub-mt-marketing-bar.model';
import { GeneralTemplatePage } from '../../models/general-template-page.model';
import { GeneralTemplateService } from '../../services/general-template.service';

@Component({
  selector: 'app-marketing-bar',
  templateUrl: './marketing-bar.component.html',
  styleUrls: ['./marketing-bar.component.scss']
})
export class MarketingBarComponent implements OnInit {

  @Input()
  customerhubMtMarketingBar: CustomerhubMtMarketingBar;

  constructor(private generalTemplateService: GeneralTemplateService) { }

  ngOnInit(): void {
  }

  getModularTemplateMarketingBar(id: string): Observable<CustomerhubMtMarketingBar> {
    return this.generalTemplateService.generalTemplatePage
      .pipe(map((generalTemplate: GeneralTemplatePage) => {
        return generalTemplate.customerhubmtmarketingbar.find((item: CustomerhubMtMarketingBar) => item.id === id);
      }))
  }

  get tealiumClickEventSend(): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-aboutus', 'score40');
  }

}
