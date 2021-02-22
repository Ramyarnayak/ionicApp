import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CloudCmsContent } from 'src/app/models/cloud-cms-content.model';
import { CloudCmsService } from 'src/app/services/cloud-cms.service';
import { BorrowingCardCategory } from '../models/borrowing-card-category.model';
import { FinancialSolutionBanking } from '../models/financial-solution-banking.model';
import { FinancialSolutionBankingCard } from '../models/financial-solution-banking-card.model';
import { FinancialSolutionBorrowing } from '../models/financial-solution-borrowing.model';
import { FinancialSolutionBorrowingCard } from '../models/financial-solution-borrowing-card.model';
import { FnSnModel } from '../models/fnsn.model';
import { FnSnHero } from '../models/fnsn-hero.model';
import { FnSnMoneyManagement } from '../models/fnsn-money-management.model';
import { FnSnMoneyManagementCard } from '../models/fnsn-money-management-card.model';
import { FnSnPage } from '../models/fnsn-page.model';
import { FnsnState } from '../models/fnsn-state.model';
import { StateRefs } from '../models/state-refs.model';
import { NoOfferError } from '../models/no-offer-error.model';
import { NoResultError } from '../models/no-result-error.model';


const cacheSize: number = 1;

@Injectable({
  providedIn: 'root'
})
export class FnSnService {

  private cache: Observable<FnSnModel>;

  private readonly contentNames: string[] = [
    'borrowingcardcategory',
    'financialsolutionbanking',
    'financialsolutionbankingcard',
    'financialsolutionborrowing',
    'financialsolutionborrowingcard',
    'financialsolutionhero',
    'financialsolutionmoneymanagement',
    'financialsolutionmoneymanagementcard',
    'financialsolutionpage',
    'nooffererror',
    'noresulterror',
    'state',
    'states'
  ];

  constructor(private cloudCmsService: CloudCmsService) { }

  get financialSolution(): Observable<FnSnModel> {
    if (!this.cache) {
      this.cache = this.requestData()
        .pipe(shareReplay(cacheSize));
    }

    return this.cache;
  }

  private requestData(): Observable<FnSnModel> {
    return this.cloudCmsService
      .queryCollections(this.contentNames)
      .pipe(map((response: [
        CloudCmsContent<Array<BorrowingCardCategory>>,
        CloudCmsContent<Array<FinancialSolutionBanking>>,
        CloudCmsContent<Array<FinancialSolutionBankingCard>>,
        CloudCmsContent<Array<FinancialSolutionBorrowing>>,
        CloudCmsContent<Array<FinancialSolutionBorrowingCard>>,
        CloudCmsContent<Array<FnSnHero>>,
        CloudCmsContent<Array<FnSnMoneyManagement>>,
        CloudCmsContent<Array<FnSnMoneyManagementCard>>,
        CloudCmsContent<Array<FnSnPage>>,
        CloudCmsContent<Array<FnsnState>>,
        CloudCmsContent<Array<StateRefs>>,
        CloudCmsContent<Array<NoOfferError>>,
        CloudCmsContent<Array<NoResultError>>,
      ]) => {
        const financialSolution: FnSnModel = response.reduce((
          accumulator: Partial<FnSnModel>,
          contentItem: CloudCmsContent<Array<BorrowingCardCategory>> |
            CloudCmsContent<Array<FinancialSolutionBanking>> |
            CloudCmsContent<Array<FinancialSolutionBankingCard>> |
            CloudCmsContent<Array<FinancialSolutionBorrowing>> |
            CloudCmsContent<Array<FinancialSolutionBorrowingCard>> |
            CloudCmsContent<Array<FnSnHero>> |
            CloudCmsContent<Array<FnSnMoneyManagement>> |
            CloudCmsContent<Array<FnSnMoneyManagementCard>> |
            CloudCmsContent<Array<FnSnPage>> |
            CloudCmsContent<Array<FnsnState>> |
            CloudCmsContent<Array<StateRefs>> |
            CloudCmsContent<Array<NoOfferError>> |
            CloudCmsContent<Array<NoResultError>>
        ) => {
          const content: Partial<FnSnModel> = {};

          content[contentItem.content] = contentItem.data;

          return { ...accumulator, ...content };
        }, {}) as FnSnModel;

        return {
          ...financialSolution
        };
      }));
  }

}
