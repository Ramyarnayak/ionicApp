import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Theme } from 'src/app/enums/theme.enum';

@Directive({
  selector: '[appBackgroundColor]',
})
export class BackgroundColorDirective implements OnChanges {

  @Input('appBackgroundColor') bgColor: string | Theme = 'white';

  constructor(private element: ElementRef) { }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = Theme[this.bgColor];
  }

}
