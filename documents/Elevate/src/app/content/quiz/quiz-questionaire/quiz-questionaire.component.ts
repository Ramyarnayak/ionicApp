import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  AfterContentChecked,
  Renderer2,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  map,
  take,
  tap
} from 'rxjs/operators';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';

import { Quiz } from '../models/quiz.model';
import { Score40Option } from '../models/score40-option.model';
import { Score40Question } from '../models/score40-question.model';
import { QuizStateService } from '../services/quiz-state.service';
import { QuizService } from '../services/quiz.service';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-quiz-questionaire',
  templateUrl: './quiz-questionaire.component.html',
  styleUrls: ['./quiz-questionaire.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms 500ms', style({opacity: 1})),
      ])
    ])
  ]
})
export class QuizQuestionaireComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @ViewChild('questionRef') questionRef: ElementRef;

  startLeaveAnimation: boolean = false;

  startPageLeaveAnimation: boolean = false;

  quizQuestion: Observable<Score40Question[]>;

  startInterAnimation: boolean = false;

  animationSpeed: number = 10;

  holder: any;

  note: any;

  quizTipShow: boolean = false;

  constructor(
    private quizService: QuizService,
    private quizStateService: QuizStateService,
    private renderer: Renderer2,
    private tealiumService: TealiumService
  ) { }

  ngOnInit(): void {
    this.quizStateService.useCustomFlow.next(false);
    this.quizQuestion = combineLatest([
        this.quizService.quiz,
        this.quizStateService.useCustomFlow
      ])
      .pipe(
        map((latest: [quiz: Quiz, useCustomFlow: boolean]) => {
          return { quiz: latest[0], useCustomFlow: latest[1] };
        }),
        map((latest: { quiz: Quiz, useCustomFlow: boolean }) => {
          if (latest.useCustomFlow) {
            return [
              ...latest.quiz.score40question.slice(0, 1),
              ...latest.quiz.score40question.slice(2, 3),
            ];
          } else {
            return latest.quiz.score40question;
          }
        })
      );

    // TODO: Move this to a later lifecycle hook so it doesn't need setTimeout()
    setTimeout(() => {
      this.startInterAnimation = true;
    });
  }

  ngAfterViewInit(): void {
    this.addClickEventOnMarkedText();
  }

  ngAfterContentChecked(): void {
    this.quizTipShow = this.quizService.QuizTipShown;
  }

  getImagePosition(layer: number): string {
    this.holder = document.getElementById('QuizQuestionaireHolder');
    this.note = document.getElementById('QuizQuestionaireNote');
    switch (layer) {
      case 1: return `calc((-1) * (${this.holder.offsetHeight}px - ${this.note.offsetHeight}px  - calc(270 / 1600 * 100vw) - ${this.note.offsetTop}px) * ${(this.quizStateService.currentQuestion + 1) / this.quizStateService.totalQuestions})`;
      case 2: return `top -${this.quizStateService.currentQuestion * (this.animationSpeed * 1)}% left`;
      case 3: return `top -${this.quizStateService.currentQuestion * (this.animationSpeed * 1.2)}% left`;
      case 4: return `top -${this.quizStateService.currentQuestion * (this.animationSpeed * 1.4)}% left calc(50 / 1600 * 100vw)`;
      case 5: return `top -${this.quizStateService.currentQuestion * (this.animationSpeed * 1.6)}% left`;
    }
  }

  /**
   * @description Add click event to marked text
   * to toggle the tip in questionaire.
   * @author Aman Purohit
   * @date 2020-11-30
   */
  addClickEventOnMarkedText(): void {
    const anchorTags: ElementRef[] = this.questionRef.nativeElement.querySelectorAll('a');
    anchorTags.forEach((anchorTag: ElementRef) => {

      this.renderer.setStyle(anchorTag, 'text-decoration', 'underline');
      this.renderer.setStyle(anchorTag, 'color', '#33CCFF');

      this.renderer.listen(anchorTag, 'click', () => {
        this.quizService.toggleQuizTip$.next(true);
        this.quizService
          .quiz
          .pipe(
            tap((quiz: Quiz) => {
              const quizBreakdownTabName: string = quiz.score40question[this.quizStateService.currentQuestion].quizBreakdownTabName;
              this.tealiumService.clickEvent(new TealiumClickEvent('customerhub-score40', quizBreakdownTabName, null, null, 'info'));
            })
          )
          .subscribe();
      });
    });
  }

  getCurrentQuestion(): number {
    return this.quizStateService.currentQuestion;
  }

  getOptionDetailById(id: string): Observable<Score40Option> {
    return this.quizService
      .quiz
      .pipe(
        map((quiz: Quiz) => {
          let foundOption: Score40Option = quiz.score40option.find((option: Score40Option) => option.id === id);

          if (
            this.quizStateService.currentQuestion === 1 &&
            this.quizStateService.optionsSelectedArray[0].answer.title.includes('3 or more')
          ) {
            foundOption = quiz.score40option
              .find((option: Score40Option) => option.title.includes('+ 3') && option.label === foundOption.label);
          }

          return foundOption;
        })
      );
  }

  getQuestion(quizQuestionsArray: Score40Question[]): Score40Question {
    // TODO: Why is this here? This component should not be responsible for setting the totalQuestions count.
    this.quizStateService.totalQuestions = quizQuestionsArray.length;
    return quizQuestionsArray[this.quizStateService.currentQuestion];
  }

  getTotalQuestionCount(quizQuestionsArray: Score40Question[]): number {
    return quizQuestionsArray.length + 1;
  }

  isActive(option: Score40Option): boolean {
    return this.quizStateService.optionsSelectedArray[this.quizStateService.currentQuestion] ?
      this.quizStateService.optionsSelectedArray[this.quizStateService.currentQuestion].answer.id === option.id :
      false;
  }

  onBackClick(): void {
    this.quizService.closeQuizTip$.next(true);
    this.startLeaveAnimation = true;
    if (this.quizStateService.currentQuestion <= 0) {
      this.startPageLeaveAnimation = true;
      this.quizService.BackFromQuiz = true;
    }
    setTimeout(() => {
      if (this.quizStateService.currentQuestion <= 0) {
        this.quizStateService.optionsSelectedArray = [];
        this.quizStateService
          .goToPreviousState();
      } else {
        const options: HTMLCollection = document.getElementsByClassName('QuizQuestionaire-left-scroll');
        this.quizStateService.optionsSelectedArray.pop();
        this.quizStateService.currentQuestion--;
        this.quizStateService.useCustomFlow.next(false);
        options[0].scrollTop = 0;
      }

      this.startLeaveAnimation = false;

    }, 500); // time of animation

    setTimeout(() => {
      this.addClickEventOnMarkedText();
    }, 500);
  }

  onNextClick(): void {
    this.quizService.closeQuizTip$.next(true);
    this.startLeaveAnimation = true;

    setTimeout(() => {
      if (this.quizStateService.totalQuestions === this.quizStateService.currentQuestion + 1) {
        if (this.quizStateService.useCustomFlow.getValue()) {
          const hardcodedLastAnswers: string = '0000111';

          this.quizStateService.optionsSelectedArray = [
            this.quizStateService.optionsSelectedArray[0],
            { answer: { value: '0' }, question: null },
            this.quizStateService.optionsSelectedArray[1],
            ...hardcodedLastAnswers.split('').map((value: string) => {
              return { answer: { value }, question: null };
            })
          ];
        }

        this.quizStateService
          .goToNextState();
      } else {
        const options: HTMLCollection = document.getElementsByClassName('QuizQuestionaire-left-scroll');

        this.quizStateService
          .useCustomFlow
          .next(
            this.quizStateService.currentQuestion === 0 &&
            this.quizStateService.optionsSelectedArray[0].answer.value === '1'
          );

        this.quizStateService.currentQuestion++;

        options[0].scrollTop = 0;
      }

      this.startLeaveAnimation = false;

    }, 500); // time of animation

    setTimeout(() => {
      this.addClickEventOnMarkedText();
    }, 500);
  }

  setOptionSelected(answer: Score40Option): void {
    this.quizQuestion
      .pipe(
        take(1),
        tap((questions: Array<Score40Question>) => {
          const question: Score40Question = this.getQuestion(questions);

          // Handle changing the selected option
          if (this.quizStateService.optionsSelectedArray.length > this.quizStateService.currentQuestion ) {
            this.quizStateService
              .optionsSelectedArray
              .pop();
          }

          this.quizStateService
            .optionsSelectedArray
            .push({ answer, question });
        })
      )
      .subscribe();
  }

  getTealiumClickEvent(quizBreakdownTabName: string, suffix: string, eventLabel?: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-score40', quizBreakdownTabName, eventLabel, null, suffix);
  }

  get isNextDisabled(): boolean {
    return this.quizStateService.optionsSelectedArray[this.quizStateService.currentQuestion] === undefined;
  }

}
