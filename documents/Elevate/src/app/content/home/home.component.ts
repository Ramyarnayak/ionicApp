import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MessageService } from '../../services/message.service';
import { TealiumConfig } from '../../shared/tealium/models/teailum-config.model';
import { TealiumService } from '../../shared/tealium/tealium.service';
import { Home } from './models/home.model';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  @Output() showNavMobile: EventEmitter<boolean> = new EventEmitter();

  home: Observable<Home> = this.homeService.home;

  financialSolutionVisible: boolean;

  subscription: Subscription;

  tealiumConfig: Partial<TealiumConfig> = { page_name: 'Home' };

  constructor(
    private homeService: HomeService,
    private messageService: MessageService,
    private tealiumService: TealiumService,
  ) {

      this.subscription = this.messageService.getMessage().subscribe(message => {
        switch (message.text) {
          case 'financialSolutionsVisible':
            this.financialSolutionVisible = true;
            break;
          case 'OnHomePage':
            this.financialSolutionVisible = false;
            break;
          default: return;
        }
      });

  }

  ngOnInit(): void {
    this.setTealiumConfig();
  }

  onShowNavMobile(showNavMobile: boolean): void {
    this.showNavMobile
      .emit(showNavMobile);
  }

  setTealiumConfig(): void {
    this.tealiumService.setTealiumData(this.tealiumConfig);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
