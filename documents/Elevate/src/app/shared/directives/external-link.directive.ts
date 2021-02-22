import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/models/link.model';
@Directive({
  selector: '[appExternalLink]'
})
export class ExternalLinkDirective implements AfterViewInit {

  @HostBinding('style.cursor') cursor: string = 'pointer';

  @Input() customLink: Link;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    const tagrgetElement: ElementRef = this.element.nativeElement;
    this.renderer.listen(tagrgetElement, 'click', () => {
      if (this.customLink.internalLink) {
        this.customLink.internalLink = this.customLink.internalLink.trim();
        if (this.isFragmentLink(this.customLink.internalLink)) {
            this.router.navigate([window.location.pathname]).then(() => {
              window.location.hash = this.customLink.internalLink.trim();
            });
        } else {
          if (this.customLink.internalLink == this.router.url) {
            window.location.reload();
          } else {
            this.router.navigateByUrl(this.customLink.internalLink.trim());
          }
        }
      } else if (this.customLink.externalLink) {
        this.customLink.externalLink = this.customLink.externalLink.trim();
        window.open(this.customLink.externalLink, '_blank');
      }
    });
  }

  isFragmentLink(link: string): boolean {
    return link.startsWith('#');
  }

}
