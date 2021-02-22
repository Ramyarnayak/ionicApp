import {  Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';

import { FnSnModel } from './models/fnsn.model';
import { FnSnService } from './services/fnsn.service';

@Component({
  selector: 'app-fnsn',
  templateUrl: './fnsn.component.html',
  styleUrls: ['./fnsn.component.scss']
})
export class FnSnComponent implements OnInit {

  financialSolution: Observable<FnSnModel>;

  constructor(
    private financialSolutionService: FnSnService,
    private tealiumService: TealiumService) { }

  ngOnInit(): void {

    // Set tealium utag propery `page_name`
    this.tealiumService.setTealiumData({ page_name: 'Financial Solutions' });

    this.financialSolution = this.financialSolutionService
      .financialSolution;
  }

}
