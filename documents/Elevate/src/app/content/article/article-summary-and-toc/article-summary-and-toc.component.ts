import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';

import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-article-summary-and-toc',
  templateUrl: './article-summary-and-toc.component.html',
  styleUrls: ['./article-summary-and-toc.component.scss']
})
export class ArticleSummaryAndTocComponent implements AfterViewChecked {

  @Input() tableOfContents: string;

  @Input() post: Post;

  @ViewChild('tableOfContentsRef') tableOfContentsRef: ElementRef;

  private unlistenFunctions: Array<() => void> = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    this.addClickEventOnMarkedText();
  }

  addClickEventOnMarkedText(): void {
    const anchorTags: ElementRef[] = this.tableOfContentsRef
      ?.nativeElement
      .querySelectorAll('a') || [];

    this.unlistenFunctions
      .forEach((func: () => void) => func());

    anchorTags.forEach((anchorTag: ElementRef) => {
      this.unlistenFunctions
        .push(this.renderer
          .listen(
            anchorTag,
            'click',
            (event: MouseEvent) => {
              const id: string = (event.target as HTMLAnchorElement).href
                .replace(/.*(\#.*)/, '$1');

              event.preventDefault();
              window.location.hash = id;
            }));
    });
  }

}
