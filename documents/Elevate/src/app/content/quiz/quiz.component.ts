import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  forkJoin,
  Observable,
  of,
  Subscription
} from 'rxjs';
import {
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

import { MessageServiceEnum } from 'src/app/enums/message-service.enum';
import { MessageService } from 'src/app/services/message.service';
import { SubmitUserDataService } from 'src/app/services/submit-user-data.service';
import { CanDeactivateInterface } from 'src/app/shared/models/can-deactivate-interface.model';
import { QuizState } from './enums/quiz-state.enum';
import { Quiz } from './models/quiz.model';
import { QuizService } from './services/quiz.service';
import { QuizStateService } from './services/quiz-state.service';
import { QuizCloseModalComponent } from './quiz-close-modal/quiz-close-modal.component';
import { QuizIntroComponent } from './quiz-intro/quiz-intro.component';
import { QuizQuestionaireComponent } from './quiz-questionaire/quiz-questionaire.component';
import { QuizEmailComponent } from './quiz-email/quiz-email.component';
import { QuizEndComponent } from './quiz-end/quiz-end.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResultConfirmationDialogComponent } from './quiz-result/quiz-result-confirmation-dialog/quiz-result-confirmation-dialog.component';
import { TealiumConfig } from 'src/app/shared/tealium/models/teailum-config.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { QuizResultService } from './services/quiz-result.service';
import { QuizResult } from './models/quiz-result.model';
import { Score40ResultsValueMapping } from 'src/app/models/score40-results-value-mapping';
import { Score40ResultsCardMapping } from './models/score40-results-card-mapping.model';
import { Score40ResultsCard } from './models/score40-results-card.model';


@Component({
  providers: [QuizStateService, QuizResultService],
  selector: 'app-root',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit, CanDeactivateInterface, OnDestroy {

  @ViewChild('closeModal', { read: ViewContainerRef }) closeModalContainer: ViewContainerRef;

  @ViewChild('quiz', { read: ViewContainerRef }) container: ViewContainerRef;

  componentRef: ComponentRef<QuizIntroComponent> | ComponentRef<QuizQuestionaireComponent> |
  ComponentRef<QuizEmailComponent> | ComponentRef<QuizEndComponent> | ComponentRef<QuizResultComponent>;

  currentQuizState: Observable<QuizState>;

  quiz: Observable<Quiz> = this.quizService.quiz;

  quizEndState: QuizState = QuizState.quizEnd;

  resultsState: QuizState = QuizState.quizResults;

  subscriptions: Array<Subscription> = [];

  constructor(
    public resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private matDialog: MatDialog,
    private messageService: MessageService,
    private quizResultService: QuizResultService,
    private quizService: QuizService,
    private quizStateService: QuizStateService,
    private submitUserDataService: SubmitUserDataService,
    private tealiumService: TealiumService,
  ) {
    this.messageService.sendMessage(MessageServiceEnum.HideHeaderNFooter);
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(event?: Event): boolean | Observable<boolean> {
    // Return false to confirm refresh, back, or forward; otherwise return the response to a modal confirm dialog.
    return event ? false : this.confirmLeaving();
  }

  ngOnInit(): void {
    this.setTealiumConfig();
  }

  setTealiumConfig(): void {
    const tealiumConfig: Partial<TealiumConfig> = { page_name: 'Score40' };
    this.tealiumService.setTealiumData(tealiumConfig);
  }

  ngAfterViewInit(): void {
    this.currentQuizState = this.quizStateService.currentQuizState;

    // Show quiz intro
    this.subscriptions
      .push(this.quizStateService
        .currentQuizState
        .pipe(
          filter((quizState: QuizState) => quizState === QuizState.quizIntro),
          tap(() => {
            this.showQuizIntro();
          })
        )
        .subscribe());

    // Show quiz questions
    this.subscriptions
      .push(this.quizStateService
        .currentQuizState
        .pipe(
          filter((quizState: QuizState) => quizState === QuizState.quizQuestionnaire),
          tap(() => this.showQuizQuiestionnaire())
        )
        .subscribe());

    // Show email screen
    this.subscriptions
      .push(this.quizStateService
        .currentQuizState
        .pipe(
          filter((quizState: QuizState) => quizState === QuizState.quizEmailScreen),
          tap(() => this.showEmailScreen())
        )
        .subscribe());

    // Show quiz end
    this.subscriptions
      .push(this.quizStateService
        .currentQuizState
        .pipe(
          filter((quizState: QuizState) => quizState === QuizState.quizEnd),
          tap(() => this.showQuizEnd())
        )
        .subscribe());

    // Show quiz results
    this.subscriptions
      .push(this.quizStateService
        .currentQuizState
        .pipe(
          filter((quizState: QuizState) => quizState === QuizState.quizResults),
          tap(() => this.showQuizResults())
        )
        .subscribe());
  }

  ngOnDestroy(): void {
    this.messageService
      .sendMessage(MessageServiceEnum.ShowHeaderNFooter);
    this.subscriptions
      .forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showEmailScreen(): void {
    this.container
      .clear();
    const factory: ComponentFactory<QuizEmailComponent> = this.resolver
      .resolveComponentFactory(QuizEmailComponent);
    this.componentRef = this.container
      .createComponent(factory);
  }

  showQuizEnd(): void {
    this.container
      .clear();
    const factory: ComponentFactory<QuizEndComponent> = this.resolver
      .resolveComponentFactory(QuizEndComponent);
    this.componentRef = this.container
      .createComponent(factory);
  }

  showQuizIntro(): void {
    this.container
      .clear();
    const factory: ComponentFactory<QuizIntroComponent> = this.resolver
      .resolveComponentFactory(QuizIntroComponent);
    this.componentRef = this.container
      .createComponent(factory);
    this.changeDetectorRef.detectChanges();
  }

  showQuizQuiestionnaire(): void {
    setTimeout(() => {
      this.container
        .clear();
      const factory: ComponentFactory<QuizQuestionaireComponent> = this.resolver
        .resolveComponentFactory(QuizQuestionaireComponent);
      this.componentRef = this.container
        .createComponent(factory);
    }, 1000);
  }

  showQuizResults(): void {
    this.subscriptions.push(
      forkJoin([
        this.quizResultService.quizResult
          .pipe(
            switchMap((quizResult: QuizResult) => this.quizResultService
              .getScore40ResutValueMapping().pipe(
                map((value: Score40ResultsValueMapping) => quizResult.score40resultscardmapping
                  .find((cardMapping: Score40ResultsCardMapping) => {
                    console.log('Consolidated Code - ' + value.consolidatedCode);
                    console.log('Base Code - ' + value.baseCode);
                    return cardMapping.indicator === value.consolidatedCode.toString()
                  }))
              ))
          ),
        this.quizResultService.quizResult
          .pipe(
            switchMap((quizResult: QuizResult) => this.quizResultService
              .getScore40ResutValueMapping().pipe(
                map((value: Score40ResultsValueMapping) => quizResult.score40resultscardmapping
                  .find((cardMapping: Score40ResultsCardMapping) => cardMapping.indicator === value.consolidatedCode.toString()))
              ))
          )
        .pipe(switchMap((score40CardMapping: Score40ResultsCardMapping) => this.quizResultService.quizResult
          .pipe(map((quizResult: QuizResult) => {
              if (score40CardMapping && score40CardMapping.cards && score40CardMapping.cards.length) {
                const mappedCards: Score40ResultsCard[] = score40CardMapping.cards.map(card => 
                  quizResult.score40resultscard.find((item: Score40ResultsCard) => card.card.id === item.id)
                );
                return mappedCards.reduce((total: number, value: Score40ResultsCard) => total + parseInt(value.headline2) , 0);
              } else {
                return 0;
              }
            })
          ))
        ),
        this.quizResultService.quizResult.pipe(
          map((quizResult: QuizResult) => quizResult)
        )
      ])
      .subscribe((result: [Score40ResultsCardMapping, number, QuizResult]) => {
        this.container
          .clear();
        const factory: ComponentFactory<QuizResultComponent> = this.resolver
          .resolveComponentFactory(QuizResultComponent);
        this.componentRef = this.container
          .createComponent(factory);
        this.componentRef.instance.cardMapping = result[0];
        this.componentRef.instance.total = result[1];
        this.componentRef.instance.quizResult = result[2];
      })
    );
  }

  private confirmLeaving(): Observable<boolean> {
    return this.quizStateService
      .currentQuizState
      .pipe(
        switchMap((quizState: QuizState) => {
          if (quizState === QuizState.quizResults){
            if (this.submitUserDataService.hasEmailCaptured) {
              return of(true);
            } else {
              const dialogRef: MatDialogRef<QuizResultConfirmationDialogComponent> = this.matDialog
                .open(QuizResultConfirmationDialogComponent, {
                  disableClose: true,
                  panelClass: 'customer-hub-quiz-result-confirm-dialog'
                });

              return dialogRef.afterClosed()
                .pipe(map(() => true));
            }
          } else {
            const factory: ComponentFactory<QuizCloseModalComponent> = this.resolver
              .resolveComponentFactory(QuizCloseModalComponent);
            const componentRef: ComponentRef<QuizCloseModalComponent> = this.closeModalContainer
              .createComponent(factory);

            return componentRef.instance
              .confirmation;
          }
        })
      );
  }

}
