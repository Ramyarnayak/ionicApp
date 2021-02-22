import { HomeHero } from './home-hero.model';
import { OurCommitment } from './our-commitment.model';
import { OurStory } from './our-story.model';
import { Score40 } from 'src/app/models/score40.model';
import { YourOptions } from './your-options.model';
import { FinancialSolutions } from './financial-solutions.model';
import { HomeSubhero } from './home-subhero';
import { OurPartners } from './our-partners.model';
import { Improving } from './improving';
import { HomePage } from './home-page.model';

export interface Home {
    homepage: HomePage;
    homehero: HomeHero;
    ourstory: OurStory;
    ourcommitment: OurCommitment;
    score40: Score40;
    youroptions: YourOptions;
    financialsolutions: FinancialSolutions;
    homesubhero: HomeSubhero;
    ourpartners: OurPartners;
    improving: Improving;
}
