import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';

import { MessageServiceEnum } from '../../../enums/message-service.enum';
import { HomeHero } from '../models/home-hero.model';
import { YourOptions } from '../models/your-options.model';
import { MessageService } from '../../../services/message.service';
import { AppService } from '../../../shared/services/app.service';
import { TealiumClickEvent } from '../../../shared/tealium/models/tealium-click-event.model';
import { FULL_VIEWPORT_ANIMATION_TIMING } from '../../../utils/consts.util';


@Component({
  animations: [
    trigger('showHideHeroDefault', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(FULL_VIEWPORT_ANIMATION_TIMING, style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate(FULL_VIEWPORT_ANIMATION_TIMING, style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('showHideHeroExpanded', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(FULL_VIEWPORT_ANIMATION_TIMING, style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        style({ 'z-index': 100 }),
        animate(FULL_VIEWPORT_ANIMATION_TIMING, style({
          opacity: 0,
          transform: 'translateX(100%)',
          'z-index': 100
        }))
      ])
    ])
  ],
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {

  @Input() homeHero: HomeHero;

  @Input() yourOptions: YourOptions;

  showYourOptions: boolean = false;

  tealiumClickEventBack: TealiumClickEvent = new TealiumClickEvent('customerhub-discovermenu', 'back');

  tealiumClickEventDiscover: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage', 'discover');

  private observer: IntersectionObserver;

  constructor(
    private appService: AppService,
    private element: ElementRef,
    private messageService: MessageService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
      if (entries[0].isIntersecting) {
        this.messageService.sendMessage(MessageServiceEnum.OnHomePage);
      } else {
        this.messageService.sendMessage(MessageServiceEnum.financialSolutionsVisible);
      }
    }, {
      threshold: 0
    });

    this.observer.observe(this.element.nativeElement as HTMLElement);
  }

  getTealiumClickEvent(yourOptionNavigationLabel: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-discovermenu', yourOptionNavigationLabel);
  }

  onBackButtonClick(): void {
    this.appService
      .showAppHeaderMobile(this.renderer);
    this.showYourOptions = false;
    this.appService
      .allowAppScroll(this.renderer);
  }

  onShowYourOptionsClick(): void {
    const appElement: Element = this.element.nativeElement.closest('.App');

    appElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.showYourOptions = true;
    this.appService
      .preventAppScroll(this.renderer);
  }

  ngOnDestroy(): void {
    this.appService
      .allowAppScroll(this.renderer);
    this.messageService
      .sendMessage(MessageServiceEnum.notOnHomePage);
    this.observer
      .unobserve(this.element.nativeElement as HTMLElement);
  }

}
