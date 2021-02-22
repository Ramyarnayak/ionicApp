import { Component, Input, OnInit } from '@angular/core';

import { TealiumService } from '../../../shared/tealium/tealium.service';
import { TealiumClickEvent } from '../../../shared/tealium/models/tealium-click-event.model';
import { OurPartners } from '../models/our-partners.model';
import { AppFormData } from '../models/app-form-data.model';
import { Navigation } from 'src/app/models/navigation.model';
import { Link } from 'src/app/models/link.model';

@Component({
  selector: 'app-financial-solutions-cta',
  templateUrl: './financial-solutions-cta.component.html',
  styleUrls: ['./financial-solutions-cta.component.scss']
})
export class FinancialSolutionsCtaComponent implements OnInit {

  @Input() ourPartners: OurPartners;

  ourPartnersNavigationList: Array<AppFormData>;

  selectedOption: AppFormData;

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage-partners', 'letsgo');

  private hasInitialized: boolean = false;

  constructor(private tealiumService: TealiumService) { }

  ngOnInit(): void {
    this.setOurPartnersNavigationList();
  }

  get selectedOptionExternalLink(): Link {
    return this.ourPartners.navigationList
      .find(
        (item: { navigation: Navigation }) =>
          item.navigation.label === this.selectedOption?.label)
      ?.navigation.link;
  }

  setOurPartnersNavigationList(): void {
    this.ourPartnersNavigationList = this.ourPartners.navigationList
      .map(
        (item: { navigation: Navigation }) => {
          return { label: item.navigation.label };
        });
    // setting the first option as default selected
    this.selectedOption = this.ourPartnersNavigationList[0];
  }

  dropdownOptionSelected(newValue: AppFormData): void {
    this.selectedOption = newValue;

    if (this.hasInitialized) {
      this.tealiumService
        .clickEvent(new TealiumClickEvent(
          'customerhub-homepage-partners',
          'dropdown',
          newValue.label
        ));
    }

    this.hasInitialized = true;
  }

}
