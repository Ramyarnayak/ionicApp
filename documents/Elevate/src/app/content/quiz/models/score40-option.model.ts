import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';
import { Post } from 'src/app/models/post.model';
import { Score40ResultsQuizBreakdownTab } from './score40-results-quiz-breakdown-tab.model';

export interface Score40Option {
    id: string;
    label: string;
    quizBreakdownTab?: Score40ResultsQuizBreakdownTab;
    resultsCarousel?: Array<{ item: CloudCmsContentReference }>;
    resultsCarouselItems?: Array<Post>;
    title: string;
    value: string;
}
