import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/shared/services/app.service';

import { TealiumConfig } from 'src/app/shared/tealium/models/teailum-config.model';
import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { TealiumService } from 'src/app/shared/tealium/tealium.service';
import { ContentBasic } from '../models/content-basic';
import { GeneralTemplateService } from '../services/general-template.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  contentBasic: Observable<ContentBasic>;

  @ViewChild('bacisContentRef') bacisContentRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private generalTemplateService: GeneralTemplateService,
    private tealiumService: TealiumService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.contentBasic = this.activatedRoute
      .params
      .pipe(switchMap((params: Params) => {
        this.setTealiumConfig(params.slug);
        return this.generalTemplateService.getContentBasic(params.slug)
      }));

  }

  setTealiumConfig(slug: string): void {
    const pageTitle = this.appService.getTitleFromSlug(slug);
    this.tealiumService
      .setTealiumData({ page_name: pageTitle });
  }

  onBasicContentBodyTextRender(): void {
    const anchorTags: Array<HTMLElement> = this.bacisContentRef?.nativeElement.querySelectorAll('a');

    anchorTags
      ?.forEach((anchorTag: HTMLElement) => {
        this.renderer
          .listen(anchorTag, 'click', () => {
            this.tealiumService
              .clickEvent(
                new TealiumClickEvent(
                  'customerhub-privacypolicy',
                  'content',
                  anchorTag?.getAttribute('href')
                )
              );
          });
      });
  }

}
