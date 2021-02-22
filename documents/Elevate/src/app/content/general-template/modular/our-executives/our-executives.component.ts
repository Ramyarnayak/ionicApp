import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerhubMtBody3 } from '../../models/customerhub-mt-body3.model';
import { GeneralTemplatePage } from '../../models/general-template-page.model';
import { OurExecutives } from '../../models/our-executives.model';
import { GeneralTemplateService } from '../../services/general-template.service';

@Component({
  selector: 'app-our-executives',
  templateUrl: './our-executives.component.html',
  styleUrls: ['./our-executives.component.scss']
})
export class OurExecutivesComponent {

  @Input() customerhubMtBody3: CustomerhubMtBody3;

  constructor(private generalTemplateService: GeneralTemplateService) { }

  get executiveList(): Observable<OurExecutives> {
    return this.generalTemplateService.generalTemplatePage
      .pipe(
        map((generalTemplatePage: GeneralTemplatePage) =>
          generalTemplatePage.ourexecutives
            .find((ourExecutive: OurExecutives) =>
              ourExecutive.id === this.customerhubMtBody3?.ourexecutives.id)
        ));
  }

}
