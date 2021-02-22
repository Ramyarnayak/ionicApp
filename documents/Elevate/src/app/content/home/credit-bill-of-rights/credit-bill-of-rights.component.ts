import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { Theme } from 'src/app/enums/theme.enum';
import { BLACK } from 'src/app/utils/consts.util';
import { OurCommitment } from '../models/our-commitment.model';

import Paralax from 'src/assets/parallax/paralax.js';

@Component({
  selector: 'app-credit-bill-of-rights',
  templateUrl: './credit-bill-of-rights.component.html',
  styleUrls: ['./credit-bill-of-rights.component.scss']
})
export class CreditBillOfRightsComponent implements OnInit, AfterViewInit {
  data: number[] =  [1,2,3,4];
  scrollBarThumbColor: string;
  @Input() ourCommitment: OurCommitment;

  constructor() { }

  ngOnInit(): void {
    this.setScrollBarThumbColor();
  }

  ngAfterViewInit(): void {
    Paralax('CreditBOR-handImg-Paralax', 200);
  }

  setScrollBarThumbColor(): void {
    this.scrollBarThumbColor = BLACK;
  }

  setBackgroundColor(): { 'background-color': Theme } {
    return { 'background-color': Theme[this.ourCommitment?.settings.theme] };
  }

}
