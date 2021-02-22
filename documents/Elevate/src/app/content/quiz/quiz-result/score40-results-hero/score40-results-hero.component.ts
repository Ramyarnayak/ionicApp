import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Score40ResultsCardMapping } from '../../models/score40-results-card-mapping.model';
import { Score40ResultsCard } from '../../models/score40-results-card.model';
import { Score40ResultsHero } from '../../models/score40-results-hero.model';

const animationScore40ResultsHeroBackground: string = 'quiz-hero-background';
@Component({
  selector: 'app-score40-results-hero',
  templateUrl: './score40-results-hero.component.html',
  styleUrls: ['./score40-results-hero.component.scss']
})
export class Score40ResultsHeroComponent implements OnInit {

  @Input() cardMapping: Score40ResultsCardMapping[];
  @Input() isEmailCaptured: boolean = false;
  @Input() quizResultsHero: Score40ResultsHero;
  @Input() score40resultscard: Score40ResultsCard[];
  @Input() total: number;
 
  isTipIconAnimate: boolean = false;
  isTipTextAnimate: boolean = false;

  constructor() { }

  @HostListener('animationend', ['$event.animationName']) animationEnd(animationName: string): void {
    if (animationName === animationScore40ResultsHeroBackground) {
      this.isTipIconAnimate = true;

      setTimeout(() => {
        this.isTipTextAnimate = true;
    }, 600);
    }
  }

  ngOnInit(): void {
  }

}
