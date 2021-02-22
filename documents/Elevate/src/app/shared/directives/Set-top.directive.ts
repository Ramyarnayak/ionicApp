import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appSetTop]'
})
export class SetTopDirective implements OnInit {

  @HostBinding('attr.style') style: string;

  @Input() appSetTopOffsetFromHost: boolean = false;

  @Input('appSetTop') top: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const elementScrollHeight: number = this.elementRef
      .nativeElement
      .scrollHeight;

    this.style = `top: ${this.appSetTopOffsetFromHost ? this.top - elementScrollHeight : this.top}px`;
  }

}
