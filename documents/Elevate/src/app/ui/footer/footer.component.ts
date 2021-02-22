import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Theme } from 'src/app/enums/theme.enum';
import { Home } from 'src/app/content/home/models/home.model';
import { HomeService } from 'src/app/content/home/services/home.service';
import { Footer } from 'src/app/models/footer';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  footer: Footer;
  home: Observable<Home> = this.homeService.home;
  subscription: Subscription;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getFooter();
  }

  getFooter(): void {
    this.subscription = this.home.subscribe(
      (response: any) => {
        this.footer = response.footer;
      },
      (error: any) => {}
    );
  }

  getTealiumClickEvent(footerTitle: string): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-footer', footerTitle);
  }

  setBackgroundColor(): { 'background-color': Theme } {
    return { 'background-color': Theme[this.footer?.settings.theme] };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
