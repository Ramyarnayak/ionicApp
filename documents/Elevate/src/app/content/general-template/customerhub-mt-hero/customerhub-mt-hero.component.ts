import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerhubMtBody1 } from '../models/customerhub-mt-body1.model';
import { ModularTemplate } from '../models/customerhub-mt.model';
import { GeneralTemplatePage } from '../models/general-template-page.model';
import { GeneralTemplateService } from '../services/general-template.service';

@Component({
  selector: 'app-customerhub-mt-hero',
  templateUrl: './customerhub-mt-hero.component.html',
  styleUrls: ['./customerhub-mt-hero.component.scss']
})
export class CustomerhubMtHeroComponent implements OnInit {

  @Input()
  customerhubModularTemplate: ModularTemplate;

  constructor(private generalTemplateService: GeneralTemplateService) { }

  ngOnInit(): void {
  }

  getModularTemplateBody1(id: string): Observable<CustomerhubMtBody1> {
    return this.generalTemplateService.generalTemplatePage
      .pipe(map((generalTemplate: GeneralTemplatePage) => {
        return generalTemplate.customerhubmtbody1.find((item: CustomerhubMtBody1) => item.id === id);
      }))
  }

}
