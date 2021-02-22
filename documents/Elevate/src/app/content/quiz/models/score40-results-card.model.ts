import { Score40ResultsCollections } from './score40-results-collections.model';

export interface Score40ResultsCard {
  code: string;
  cta: string;
  description: string;
  headline1: string;
  headline2: string;
  id: string;
  resultsCollections: Score40ResultsCollections;
  title: string;
}
