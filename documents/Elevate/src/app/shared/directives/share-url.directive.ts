import { Directive, HostListener, Input } from '@angular/core';
import { FacebookParams } from 'src/app/models/facebook-params.model';
import { PinterestParams } from 'src/app/models/pinterest-params.model';
import { RedditParams } from 'src/app/models/reddit-params.model';
import { TwitterParams } from 'src/app/models/twitter-params.model';

@Directive({
  selector: '[appShareUrl]',
})
export class ShareUrlDirective {
  @Input() facebook: FacebookParams;
  @Input() twitter: TwitterParams;
  @Input() pinterest: PinterestParams;
  @Input() reddit: RedditParams;

  private sharers = {
    facebook: {
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
    },
    twitter: {
      shareUrl: 'https://twitter.com/intent/tweet/',
    },
    pinterest: {
      shareUrl: 'https://pinterest.com/pin/create/bookmarklet/',
    },
    reddit: {
      shareUrl: 'https://www.reddit.com/submit',
    },
  };

  private urlSharer(sharer: any) {
    let p = sharer.params || {},
      keys = Object.keys(p),
      i: any,
      str = keys.length > 0 ? '?' : '';
    for (i = 0; i < keys.length; i++) {
      if (str !== '?') {
        str += '&';
      }
      if (p[keys[i]]) {
        str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
      }
    }

    let url = sharer.shareUrl + str;

    if (!sharer.isLink) {
      let popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams =
          'scrollbars=no, width=' +
          popWidth +
          ', height=' +
          popHeight +
          ', top=' +
          top +
          ', left=' +
          left,
        newWindow = window.open(url, '', popParams);

      if (window.focus) {
        newWindow.focus();
      }
    } else {
      window.location.href = url;
    }
  }

  private getSharer() {
    let _sharer: any = {};
    if (this.facebook) {
      _sharer = this.sharers['facebook'];
      _sharer.params = this.facebook;
    }

    if (this.twitter) {
      _sharer = this.sharers['twitter'];
      _sharer.params = this.twitter;
    }

    if (this.pinterest) {
      _sharer = this.sharers['pinterest'];
      _sharer.params = this.pinterest;
    }

    if (this.reddit) {
      _sharer = this.sharers['reddit'];
      _sharer.params = this.reddit;
    }

    return _sharer;
  }

  constructor() {}

  @HostListener('click') share() {
    let s = this.getSharer();
    return s !== undefined ? this.urlSharer(s) : false;
  }
}
