import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { getDeviceType } from 'src/app/utils/dom.util';
import { ScriptLoaderService } from '../services/script-loader.service';

import { TealiumEventType } from './enums/tealium-event-type.enum';
import { TealiumClickEvent } from './models/tealium-click-event.model';
import { TealiumConfig } from './models/teailum-config.model';
import { TealiumEvent } from './models/tealium-event.model';
import { UTag } from './models/u-tag.model';

@Injectable({
  providedIn: 'root'
})
export class TealiumService {
  private tealiumScript: Promise<UTag>;

  constructor(private scriptLoader: ScriptLoaderService) {
    this.setConfigurations();
    this.tealiumScript = this.getScript();
  }

  clickEvent(tealiumClickEvent: TealiumClickEvent, eventAction?: TealiumEventType): void {
    const clickEvent: TealiumEvent = {
      event_action: eventAction ? eventAction : TealiumEventType.Click,
      ...tealiumClickEvent
    };

    this.link(clickEvent);
  }

  link(data: TealiumEvent): void {
    this.tealiumScript
      .then((utag: UTag) => utag.link({...data, ...utag.data}));
  }

  setTealiumData(tealiumConfig: Partial<TealiumConfig>): void {
    this.tealiumScript.then((utag: UTag) => {
      Object.entries(tealiumConfig).forEach((property: [string, string | number]) => {
        const [key, value]: [string,  string | number] = property;
        utag.data[key] = value;
      });
    });
  }

  view(data: TealiumEvent): void {
    this.tealiumScript
      .then((utag: UTag) => utag.view({...data, ...utag.data}));
  }

  private getScript(): Promise<UTag> {
    const {
      _account,
      _environment,
      _profile
    }: {
      _account: string,
      _environment: string,
      _profile: string
    } = environment.tealium;
    const url: string = `https://tags.tiqcdn.com/utag/${_account}/${_profile}/${_environment}/utag.js`;
    return this.scriptLoader.loadScriptAndGetGlobal(url, 'utag');
  }

  private setConfigurations(): void {
    const initVariables: Partial<TealiumConfig> = {
      browser: navigator.userAgent,
      devicetype: getDeviceType(),
      full_referral_url: document.referrer,
      page_type: '', // leaving blank as per requirement
      product_code: 'Elevate',
    };

    (window as any).utag_cfg_ovrd = { noview: true }; // tealium configuration for single page app
    (window as any).utag_data = {
      'cp.utagdb': true,
      ...initVariables,
    };
  }

}
