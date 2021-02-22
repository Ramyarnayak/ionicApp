import { BorrowingCardCategory } from './borrowing-card-category.model';
import { FinancialSolutionBanking } from './financial-solution-banking.model';
import { FinancialSolutionBankingCard } from './financial-solution-banking-card.model';
import { FinancialSolutionBorrowing } from './financial-solution-borrowing.model';
import { FinancialSolutionBorrowingCard } from './financial-solution-borrowing-card.model';
import { FnSnMoneyManagement } from './fnsn-money-management.model';
import { FnSnMoneyManagementCard } from './fnsn-money-management-card.model';
import { FnSnHero } from './fnsn-hero.model';
import { FnsnState } from './fnsn-state.model';
import { StateRefs } from './state-refs.model';
import { FnSnPage } from './fnsn-page.model';
import { NoOfferError } from './no-offer-error.model';
import { NoResultError } from './no-result-error.model';

export interface FnSnModel {
    borrowingcardcategory: Array<BorrowingCardCategory>;
    financialsolutionbanking: Array<FinancialSolutionBanking>;
    financialsolutionbankingcard: Array<FinancialSolutionBankingCard>;
    financialsolutionborrowing: Array<FinancialSolutionBorrowing>;
    financialsolutionborrowingcard: Array<FinancialSolutionBorrowingCard>;
    financialsolutionhero: Array<FnSnHero>;
    financialsolutionmoneymanagement: Array<FnSnMoneyManagement>;
    financialsolutionmoneymanagementcard: Array<FnSnMoneyManagementCard>;
    financialsolutionpage: Array<FnSnPage>;
    nooffererror: Array<NoOfferError>;
    noresulterror: Array<NoResultError>;
    state: Array<FnsnState>;
    states: Array<StateRefs>;
}
