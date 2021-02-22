import { AfterViewChecked, AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTargetBlank]'
})
export class TargetBlankDirective implements AfterViewInit, AfterViewChecked{

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.setAttributeAndStyle();
  }

  ngAfterViewChecked(): void {
    this.setAttributeAndStyle();
  }

  setAttributeAndStyle(): void {
    const anchorTags: ElementRef[] = this.element.nativeElement.querySelectorAll('a');

    anchorTags.forEach((anchorTag: ElementRef) => {
      this.renderer.setAttribute(anchorTag, 'target', '_blank');
      this.renderer.setStyle(anchorTag, 'cursor', 'pointer');
    });
  }
}
