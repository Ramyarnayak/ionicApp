import { SearchResultData } from './search-result-data.model';
export interface SearchResult {
  content: string;
  countFound: number;
  data: Array<SearchResultData>;
}
