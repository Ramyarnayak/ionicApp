import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appThrottleClick]'
})
export class ThrottleClickDirective implements OnInit, OnDestroy {

  @Input() throttleTime: number = 500;
  @Output() throttleClick: EventEmitter<Event> = new EventEmitter();

  private clicks: Subject<Event> = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(throttleTime(this.throttleTime))
      .subscribe((e: Event) => this.throttleClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
