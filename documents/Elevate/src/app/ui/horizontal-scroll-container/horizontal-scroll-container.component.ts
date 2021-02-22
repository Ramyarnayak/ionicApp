import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  HostListener
} from '@angular/core';

const thumbWidth: number = 50;
const scrollWidthOnButtonClick: number = 150;

@Component({
  selector: 'app-horizontal-scroll-container',
  templateUrl: './horizontal-scroll-container.component.html',
  styleUrls: ['./horizontal-scroll-container.component.scss'],
})
export class HorizontalScrollContainerComponent
  implements OnChanges {

  @Input()
  scrollThumbColor: string;

  @Input()
  showScrollButtons: boolean = false;

  @Input()
  scrollButtonColor: string = 'elevate_blue';

  @Input()
  paddingLeftClass: string = 'container-left';

  @ViewChild('scrollingContainer', { read: ElementRef })
  private scrollingContainer: ElementRef;

  @ViewChild('scrollBar', { read: ElementRef })
  private scrollBar: ElementRef;

  marginLeftOfProgressBar: number = 0;
  scrollBarBorderColor: string;
  isVisibleScrollbar: boolean = false;

  ngOnChanges(): void {
    this.scrollBarBorderColor = this.scrollThumbColor;
  }

  scrollHandler(event: UIEvent): void {
    this.setScrollThumbMargin();
  }

  @HostListener('window:resize', ['$event']) onResize(): void {
    this.checkClienWidth();
  }

  @HostListener('document:wheel', ['$event.target']) onScroll(): void {
    this.checkClienWidth();
  }

  @HostListener('window:load', ['$event']) onLoad(): void {
    this.checkClienWidth();
  }

  setScrollThumbMargin(): void {
    if (this.isVisibleScrollbar) {
      const scrollLeft: number = this.scrollingContainer.nativeElement.scrollLeft;
      const scrollWidth: number = this.scrollingContainer.nativeElement
        .scrollWidth;
      const clientWidth: number = this.scrollingContainer.nativeElement
        .clientWidth;

      const relativeWidthPercentageOfScrollThumb: number =
        (thumbWidth / this.scrollBar.nativeElement.clientWidth) * 100;

      // Subtracting relativeWidthPercentageOfScrollThumb from 100 to remove the extra margin
      // added due to the width of scroll thumb
      this.marginLeftOfProgressBar =
        ((100 - relativeWidthPercentageOfScrollThumb) * scrollLeft) /
        (scrollWidth - clientWidth);
    }
  }

  checkClienWidth(): void {
    (this.scrollingContainer.nativeElement.clientWidth < this.scrollingContainer.nativeElement
      .scrollWidth) ? this.isVisibleScrollbar = true : this.isVisibleScrollbar = false;
  }

  next(): void {
    this.scrollingContainer.nativeElement.scrollTo({
      left: this.scrollingContainer.nativeElement.scrollLeft + scrollWidthOnButtonClick, behavior: 'smooth'
    });
  }

  previous(): void {
    this.scrollingContainer.nativeElement.scrollTo({
      left: this.scrollingContainer.nativeElement.scrollLeft - scrollWidthOnButtonClick, behavior: 'smooth'
    });
  }
}
