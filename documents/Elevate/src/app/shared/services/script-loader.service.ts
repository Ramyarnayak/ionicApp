import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  public readonly retries: number = 3;
  public count: number = 0;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public loadScript(url: string): Promise<any> {
    return new Promise((resolve: () => void, reject: (url: any) => void) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.async = true;
      scriptElement.defer = true;

      scriptElement.onload = () => resolve();
      scriptElement.onerror = () => reject(url);

      this.document.body.appendChild(scriptElement);
    });
  }

  public loadScriptAndGetGlobal(
    url: string,
    globalVariableToReturnAfterLoad: string
  ): Promise<any> {
    return this.loadScript(url)
      .then(() => {
        return (window as any)[globalVariableToReturnAfterLoad];
      })
      .catch((scriptUrl: string) => {
        ++this.count;
        if (this.count === this.retries) {
          return;
        }
        return this.loadScriptAndGetGlobal(
          scriptUrl,
          globalVariableToReturnAfterLoad
        );
      });
  }
}
