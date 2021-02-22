import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { CustomerhubMtBody2 } from '../../models/customerhub-mt-body2.model';
import { GeneralTemplatePage } from '../../models/general-template-page.model';
import { GeneralTemplateService } from '../../services/general-template.service';

@Component({
  selector: 'app-beliefs',
  templateUrl: './beliefs.component.html',
  styleUrls: ['./beliefs.component.scss']
})
export class BeliefsComponent {

  @Input() customerhubMtBody2Ref: CloudCmsContentReference;

  constructor(private generalTemplateService: GeneralTemplateService) { }

  get customerhubMtbody2Content(): Observable<CustomerhubMtBody2> {
    return this.generalTemplateService.generalTemplatePage
      .pipe(map((generalTemplate: GeneralTemplatePage) => {
        return generalTemplate.customerhubmtbody2
          .find((item: CustomerhubMtBody2) => item.id === this.customerhubMtBody2Ref?.id);
      }));
  }

}
