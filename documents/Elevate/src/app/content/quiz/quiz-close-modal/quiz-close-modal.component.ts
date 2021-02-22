import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
  map,
  take,
  tap
} from 'rxjs/operators';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

import { QuizCloseModal } from '../models/quiz-close-modal';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-close-modal',
  templateUrl: './quiz-close-modal.component.html',
  styleUrls: ['./quiz-close-modal.component.scss']
})
export class QuizCloseModalComponent implements OnInit {

  hide: boolean = false;

  quizCloseModal: Observable<QuizCloseModal>;

  private confirmationSubject: Subject<boolean> = new Subject();

  constructor(private quizService: QuizService) { }

  get confirmation(): Observable<boolean> {
    return this.confirmationSubject
      .asObservable();
  }

  ngOnInit(): void {
    this.quizCloseModal = this.quizService
      .quiz
      .pipe(
        map((quiz: Quiz) => quiz.score40exitwarning[0])
      );

    this.confirmation
      .pipe(
        take(1),
        tap((confirmation: boolean) => confirmation || this.closeModal()))
      .subscribe();
  }

  closeModal(): void {
    this.hide = true;
  }

  emitAnswer(confirmation: boolean): void {
    this.confirmationSubject
      .next(confirmation);
  }

  getTealiumClickEvent(subCategory: string, suffix: string): TealiumClickEvent {
    return suffix ?
      new TealiumClickEvent('customerhub-score40', subCategory, null, null, suffix) :
      new TealiumClickEvent('customerhub-score40', subCategory);
  }

}
