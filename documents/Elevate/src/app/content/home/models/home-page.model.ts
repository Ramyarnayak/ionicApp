import { CloudCmsContentReference } from 'src/app/models/cloud-cms-content-reference.model';

export interface HomePage {
    header: CloudCmsContentReference;
    homeHero: CloudCmsContentReference;
    homeSubHero: CloudCmsContentReference;
    financialSolutions: CloudCmsContentReference;
    score40: CloudCmsContentReference;
    ourStory: CloudCmsContentReference;
    ourCommitment: CloudCmsContentReference;
    knowledgeCenter: CloudCmsContentReference;
    improving: CloudCmsContentReference;
    footer: CloudCmsContentReference;
}
