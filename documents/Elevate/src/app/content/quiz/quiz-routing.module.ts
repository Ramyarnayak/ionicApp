import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';
import { QuizEmailComponent } from './quiz-email/quiz-email.component';
import { QuizIntroComponent } from './quiz-intro/quiz-intro.component';
import { QuizQuestionaireComponent } from './quiz-questionaire/quiz-questionaire.component';
import { QuizEndComponent } from './quiz-end/quiz-end.component';
import { QuizComponent } from './quiz.component';
import { QuizCloseModalComponent } from './quiz-close-modal/quiz-close-modal.component';

const quizChildRoutes: Routes = [
  {
    path: 'quiz-intro',
    component: QuizIntroComponent
  },
  {
    path: 'quiz-questionaire',
    component: QuizQuestionaireComponent
  },
  {
    path: 'quiz-email',
    component: QuizEmailComponent
  },
  {
    path: 'quiz-end',
    component: QuizEndComponent
  },
  {
    path: 'quiz-close',
    component: QuizCloseModalComponent
  }
];

const routes: Routes = [{
  canDeactivate: [CanDeactivateGuard],
  children: quizChildRoutes,
  component: QuizComponent,
  path: ''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
