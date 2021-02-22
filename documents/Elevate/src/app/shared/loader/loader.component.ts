import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  public show: boolean;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderStatus$
      .subscribe((response: boolean) => {
        this.show = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
}
