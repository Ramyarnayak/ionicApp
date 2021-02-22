import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from 'src/app/shared/shared.module';
import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCloseModalComponent } from './quiz-close-modal/quiz-close-modal.component';
import { QuizEmailComponent } from './quiz-email/quiz-email.component';
import { QuizEndComponent } from './quiz-end/quiz-end.component';
import { QuizHeaderComponent } from './quiz-header/quiz-header.component';
import { QuizIntroComponent } from './quiz-intro/quiz-intro.component';
import { QuizQuestionaireComponent } from './quiz-questionaire/quiz-questionaire.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResultHeaderComponent } from './quiz-result/quiz-result-header/quiz-result-header.component';
import { QuizResultConfirmationDialogComponent } from './quiz-result/quiz-result-confirmation-dialog/quiz-result-confirmation-dialog.component';
import { QuizResultScoreInfoComponent } from './quiz-result/quiz-result-score-info/quiz-result-score-info.component';
import { Score40ResultsHeroComponent } from './quiz-result/score40-results-hero/score40-results-hero.component';
import { Score40ResultsFinalScoreComponent } from './quiz-result/score40-results-hero/score40-results-final-score/score40-results-final-score.component';
import { QuizTipComponent } from './quiz-tip/quiz-tip.component';
import { Score40MessageCardsComponent } from './quiz-result/score40-message-cards/score40-message-cards.component';
import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';

@NgModule({
  declarations: [
    QuizCloseModalComponent,
    QuizComponent,
    QuizEmailComponent,
    QuizEndComponent,
    QuizHeaderComponent,
    QuizIntroComponent,
    QuizQuestionaireComponent,
    QuizResultComponent,
    QuizResultConfirmationDialogComponent,
    QuizResultHeaderComponent,
    QuizResultScoreInfoComponent,
    QuizTipComponent,
    Score40ResultsHeroComponent,
    Score40ResultsFinalScoreComponent,
    Score40MessageCardsComponent
  ],
  exports: [ QuizComponent ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    QuizRoutingModule,
    SharedModule
  ],
  providers: [SubmitUserDataService],
})
export class QuizModule {

}
