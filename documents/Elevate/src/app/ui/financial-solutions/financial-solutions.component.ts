import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { FinancialSolutions } from 'src/app/content/home/models/financial-solutions.model';
import { HomeSubhero } from 'src/app/content/home/models/home-subhero';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { ELEVATE_BLUE } from 'src/app/utils/consts.util';

import Paralax from 'src/assets/parallax/paralax.js';

@Component({
  selector: 'app-financial-solutions',
  templateUrl: './financial-solutions.component.html',
  styleUrls: ['./financial-solutions.component.scss']
})
export class FinancialSolutionsComponent implements OnInit, AfterViewInit {

  @Input() financialSolutionsId: string;
  @Input() homesubhero: HomeSubhero;
  @Input() isScore40Results: boolean = false;

  financialsolutions: Observable<FinancialSolutions>;
  scrollBarThumbColor: string = ELEVATE_BLUE;

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngOnInit(): void {
    this.financialsolutions = this.appCommonDataService
      .getAppCommonData<FinancialSolutions>(AppContentName.FinancialSolutions, this.financialSolutionsId);
  }

  ngAfterViewInit(): void {
    Paralax('FinancialSolutions-Images-HandImageContainer-Paralax', 200);
  }

  getDisclaimer(id: string): Observable<Disclaimer> {
    return this.appCommonDataService.getAppCommonData<Disclaimer>(AppContentName.Disclaimer, id);
  }
}
