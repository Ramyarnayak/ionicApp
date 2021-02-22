import { QuizCloseModal } from './quiz-close-modal';
import { QuizEmail } from './quiz-email.model';
import { QuizIntro } from './quiz-intro.model';
import { Score40CloseResults } from './score40-close-results.model';
import { Score40Option } from './score40-option.model';
import { Score40Question } from './score40-question.model';
import { Score40QuestionOrder } from './score40-question-order.model';
import { ScreenLoading } from './screen-loading.model';

export interface Quiz {
  score40emailquiz: Array<QuizEmail>;
  score40exitwarning: QuizCloseModal;
  score40intro: QuizIntro;
  score40option: Array<Score40Option>;
  score40question: Array<Score40Question>;
  score40questionorder: Array<Score40QuestionOrder>;
  score40screenloading: Array<ScreenLoading>;
  score40closeresults: Array<Score40CloseResults>;
}
