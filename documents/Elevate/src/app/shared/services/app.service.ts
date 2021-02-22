import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  allowAppScroll(renderer: Renderer2): void {
    renderer.removeClass(document.getElementById('App'), 'no-scroll');
  }

  hideAppHeaderMobile(renderer: Renderer2): void {
    renderer.addClass(document.getElementsByTagName('app-header-mobile')[0], 'hide');
  }

  preventAppScroll(renderer: Renderer2): void {
    renderer.addClass(document.getElementById('App'), 'no-scroll');
  }

  showAppHeaderMobile(renderer: Renderer2): void {
    renderer.removeClass(document.getElementsByTagName('app-header-mobile')[0], 'hide');
  }

  getTitleFromSlug(slug: string) {
    return slug.split('-').map(item => item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()).join(' ');
  }

}
