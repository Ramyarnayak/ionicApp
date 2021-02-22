import { CaptureEmailCardModel } from '../../../shared/models/capture-email-card.model';
import { Score40ResultsCarouselItem } from './score40-results-carousel-item.model';
import { Score40ResultsQuizBreakdown } from './score40-results-quiz-breakdown.model';
import { Score40ResultsHero } from './score40-results-hero.model';
import { Score40ResultsPage } from './score40-results-page.model';
import { Score40ResultsCardMapping } from './score40-results-card-mapping.model';
import { Score40ResultsCard } from './score40-results-card.model';
import { Score40ResultsNote } from './score40-results-note.model';

export interface QuizResult {
    score40emailresults: Array<CaptureEmailCardModel>;
    score40resultscard: Array<Score40ResultsCard>;
    score40resultscardmapping: Array<Score40ResultsCardMapping>;
    score40resultscarouselitem: Array<Score40ResultsCarouselItem>;
    score40resultshero: Array<Score40ResultsHero>;
    score40resultsnote: Array<Score40ResultsNote>
    score40resultspage: Array<Score40ResultsPage>;
    score40resultsquizbreakdown: Array<Score40ResultsQuizBreakdown>;
}
