import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Theme } from 'src/app/enums/theme.enum';
import { Disclaimer } from 'src/app/models/disclaimer.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { Improving } from '../models/improving';

import Paralax from 'src/assets/parallax/paralax.js';

@Component({
  selector: 'app-start-your-climb',
  templateUrl: './start-your-climb.component.html',
  styleUrls: ['./start-your-climb.component.scss']
})
export class StartYourClimbComponent implements OnInit {

  constructor(
    private appCommonDataService: AppCommonDataService
  ) { }

  @Input() improving: Improving;

  ngOnInit(): void {
    Paralax('StartYourClimb-Images-arrows-Paralax', 200);
  }

  getDisclaimer(id: string): Observable<Disclaimer> {
    return this.appCommonDataService.getAppCommonData<Disclaimer>(AppContentName.Disclaimer, id);
  }

}
