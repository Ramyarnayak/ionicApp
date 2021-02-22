import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() pages: number;

  width: number;

  constructor() { }

  ngOnInit(): void {
    this.setWidth();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.currentPage = simpleChanges.currentPage.currentValue;
    this.setWidth();
  }

  setWidth(): void {
    this.width = (this.currentPage / this.pages) * 100;
  }

}
