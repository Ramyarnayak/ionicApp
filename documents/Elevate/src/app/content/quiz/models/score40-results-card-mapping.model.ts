import { Score40ResultsCard } from './score40-results-card.model';

export interface Score40ResultsCardMapping {
  cards: Array<{ card: Score40ResultsCard }>;
  id: string;
  indicator: string;
  title: string;
}
