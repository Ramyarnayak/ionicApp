import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuizResult } from '../../../models/quiz-result.model';
import { Score40ResultsHero } from '../../../models/score40-results-hero.model';
import { QuizResultService } from '../../../services/quiz-result.service';

@Component({
  selector: 'app-score40-results-final-score',
  templateUrl: './score40-results-final-score.component.html',
  styleUrls: ['./score40-results-final-score.component.scss']
})
export class Score40ResultsFinalScoreComponent implements OnInit, OnDestroy {
  @Input() quizResultsHero: Score40ResultsHero;
  score40ResultsPoints: number;
  subscription: Subscription;

  constructor(private quizResultsService: QuizResultService) { }

  ngOnInit(): void {

    this.subscription = this.quizResultsService.score40ResultsTotalPoints$.subscribe(
      (points: number) => this.score40ResultsPoints = points);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
