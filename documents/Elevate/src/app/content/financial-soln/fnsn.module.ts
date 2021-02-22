import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { FnSnComponent } from './fnsn.component';
import { FnSnHeroComponent } from './fnsn-hero/fnsn-hero.component';
import { FnSnBorrowingComponent } from './fnsn-borrowing/fnsn-borrowing.component';
import { FnSnMoneyManagementComponent } from './fnsn-money-management/fnsn-money-management.component';
import { FnSnBankingComponent } from './fnsn-banking/fnsn-banking.component';
import { FnSnRoutingModule } from './fnsn-routing.module';
import { FnsnBorrowingCardComponent } from './fnsn-borrowing-card/fnsn-borrowing-card.component';
import { NoOfferErrorComponent } from './no-offer-error/no-offer-error.component';
import { NoResultErrorComponent } from './no-result-error/no-result-error.component';
import { FnsnBankingCardComponent } from './fnsn-banking-card/fnsn-banking-card.component';

@NgModule({
  declarations: [
    FnSnComponent,
    FnSnHeroComponent,
    FnSnBorrowingComponent,
    FnSnMoneyManagementComponent,
    FnSnBankingComponent,
    FnsnBorrowingCardComponent,
    NoOfferErrorComponent,
    NoResultErrorComponent,
    FnsnBankingCardComponent
  ],
  exports: [ FnSnComponent ],
  imports: [
    CommonModule,
    FormsModule,
    FnSnRoutingModule,
    SharedModule,
  ],
})
export class FnSnModule {

}
