import { AfterViewInit, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { OurStory } from 'src/app/content/home/models/our-story.model';
import { Image } from 'src/app/models/image.model';
import { AppCommonDataService } from 'src/app/shared/services/app-common-data.service';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';

import Paralax from 'src/assets/parallax/paralax.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  @Input() ourStory: OurStory;

  isVideoTypeMedia: boolean = false;

  tealiumClickEvent: TealiumClickEvent = new TealiumClickEvent('customerhub-homepage', 'ourstory');

  constructor(private appCommonDataService: AppCommonDataService) { }

  ngAfterViewInit(): void {
    Paralax('HomeAbout-mediaImage-Paralax', 200);
  }

  get media(): Observable<Image> {
    return this.appCommonDataService
      .getAppCommonData<Image>(AppContentName.Image, this.ourStory?.media.image.id);
  }
}
