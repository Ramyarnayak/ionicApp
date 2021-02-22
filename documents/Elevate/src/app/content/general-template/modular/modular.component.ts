import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TealiumConfig } from 'src/app/shared/tealium/models/teailum-config.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { GeneralTemplatePage } from '../models/general-template-page.model';
import { GeneralTemplateService } from '../services/general-template.service';

@Component({
  selector: 'app-modular',
  templateUrl: './modular.component.html',
  styleUrls: ['./modular.component.scss']
})
export class ModularComponent implements OnInit {

  tealiumConfig: Partial<TealiumConfig> = { page_name: 'About Us' };

  generalTemplateContent: Observable<GeneralTemplatePage> = this.generalTemplateService.generalTemplatePage;

  constructor(private generalTemplateService: GeneralTemplateService,
    private tealiumService: TealiumService) { }

  ngOnInit(): void {
  }

  setTealiumConfig(): void {
    this.tealiumService.setTealiumData(this.tealiumConfig);
  }

}
