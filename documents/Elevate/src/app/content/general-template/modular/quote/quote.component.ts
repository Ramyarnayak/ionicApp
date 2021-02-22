import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { CustomerhubMtQuoteBar } from '../../models/customerhub-mt-quote-bar.model';
import { GeneralTemplatePage } from '../../models/general-template-page.model';
import { GeneralTemplateService } from '../../services/general-template.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {

  @Input() customerhubMtQuoteBarRef: CloudCmsContentReference;

  constructor(private generalTemplateService: GeneralTemplateService) { }

  get customerhubMtQuoteBarContent(): Observable<CustomerhubMtQuoteBar> {
    return this.generalTemplateService.generalTemplatePage
      .pipe(map((generalTemplate: GeneralTemplatePage) => {
        return generalTemplate.customerhubmtquotebar
          .find((item: CustomerhubMtQuoteBar) => item.id === this.customerhubMtQuoteBarRef?.id);
      }));
  }

}
