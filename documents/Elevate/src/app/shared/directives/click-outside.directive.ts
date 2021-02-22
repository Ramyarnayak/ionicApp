import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  NgZone,
} from '@angular/core';

@Directive({ selector: '[appClickOutside]' })
export class ClickOutsideDirective implements OnInit, OnDestroy {

  @Output() appClickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private events: Array<string> = ['click'];

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit(): void {
    this._initClickOutsideListener();
  }

  ngOnDestroy(): void {
    this._removeClickOutsideListener();
  }

  private _onClickBody(ev: Event): void {
    if (!this.elementRef.nativeElement.contains(ev.target)) {
      this._emit(ev);
    }
  }

  private _emit(ev: Event): void {
    this.ngZone.run(() => this.appClickOutside.emit(ev));
  }

  private _initClickOutsideListener(): void {
    this.ngZone.runOutsideAngular(() => {
      this.events.forEach((e: string) => document.addEventListener(e, this._onClickBody));
    });
  }

  private _removeClickOutsideListener(): void {
    this.ngZone.runOutsideAngular(() => {
      this.events.forEach((e: string) => document.removeEventListener(e, this._onClickBody));
    });
  }

}
