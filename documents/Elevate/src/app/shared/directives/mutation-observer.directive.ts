import { Directive, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appMutationObserver]'
})
export class MutationObserverDirective implements OnDestroy {

  private observer: MutationObserver;

  @Output() innerHtmlRendered: EventEmitter<null> = new EventEmitter();

  constructor(private el: ElementRef) {
    this.observer = new MutationObserver((mutations: Array<MutationRecord>) => {
      mutations.forEach((mutation: MutationRecord, index: number) => {
        if (mutation.type === 'childList') {
          this.innerHtmlRendered.emit();
        }
      });
    });
    this.observer.observe(
      this.el.nativeElement,
      { attributes: true, childList: true, characterData: true }
    );
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
