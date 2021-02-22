import { Score40ResultsNote } from './score40-results-note.model';

export interface Score40ResultsCollections {
  description: string;
  id: string;
  notes: Array<{ note: Score40ResultsNote }>;
  notesHeadline: string;
}
