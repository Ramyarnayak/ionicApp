import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { QuizResult } from '../../models/quiz-result.model';
import { Score40ResultsCardMapping } from '../../models/score40-results-card-mapping.model';
import { Score40ResultsCard } from '../../models/score40-results-card.model';
import { Score40ResultsNote } from '../../models/score40-results-note.model';
import { QuizResultService } from '../../services/quiz-result.service';

@Component({
  selector: 'app-score40-message-cards',
  templateUrl: './score40-message-cards.component.html',
  styleUrls: ['./score40-message-cards.component.scss']
})
export class Score40MessageCardsComponent implements OnInit {

  @Input() cardMapping: Score40ResultsCardMapping;

  @Input() score40resultscard: Score40ResultsCard[];

  @Input() total: number;

  selectedIndex: number;

  private tealiumEventCategory: string = 'customerhub-score40';

  private tealiumEventName: string = 'results';

  constructor(private quizResultsService: QuizResultService, private tealiumService: TealiumService) { }

  ngOnInit(): void {
    this.quizResultsService.setCore40ResultPoints(this.total);
  }

  closeExpandableSection(): void {
    this.selectedIndex = null;
  }

  getCardData(id: string): Score40ResultsCard {
    return this.score40resultscard.find((item: Score40ResultsCard) => item.id === id);
  }

  getNoteData(id: string): Observable<Score40ResultsNote> {
    return this.quizResultsService
      .quizResult
      .pipe(map((quizResult: QuizResult) => {
        return quizResult.score40resultsnote.find((item: Score40ResultsNote) => item.id === id);
      }));
  }

  sendTealiumDetailsClickEvent(
    index: number,
    isClose: boolean,
    score40ResultsCard: Score40ResultsCard
  ): void {
    this.tealiumService
      .clickEvent(new TealiumClickEvent(
        this.tealiumEventCategory,
        this.tealiumEventName,
        isClose ? null : score40ResultsCard.headline2 || '0',
        null,
        `details${index + 1}-${score40ResultsCard.code}${isClose ? '-close' : ''}`,
        true
      ));
  }

  showHideExpandableSection(cardIndex: number): void {
    if (this.selectedIndex === cardIndex) {
      this.selectedIndex = null;
    } else {
      this.selectedIndex = cardIndex;
    }
  }

}
