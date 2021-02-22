import { Component, Input, OnInit } from '@angular/core';

import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { QuizResult } from '../models/quiz-result.model';
import { Score40ResultsCardMapping } from '../models/score40-results-card-mapping.model';
import { QuizResultService } from '../services/quiz-result.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {


  @Input('cardMapping') cardMapping: Score40ResultsCardMapping;

  @Input('quizResult') quizResult: QuizResult;

  @Input('total') total: number;

  isEmailCapturedInitial: boolean;

  constructor(private submitUserDataService: SubmitUserDataService) { }

  ngOnInit(): void {
    this.isEmailCapturedInitial = this.submitUserDataService.hasEmailCaptured;
  }

}
