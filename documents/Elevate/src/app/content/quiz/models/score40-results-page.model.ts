import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface Score40ResultsPage {
    id: string;
    title: string;
    resultsHero: CloudCmsContentReference;
    quizBreakdown: CloudCmsContentReference;
    knowledgeCenter: CloudCmsContentReference;
    financialSolutions: CloudCmsContentReference;
}
