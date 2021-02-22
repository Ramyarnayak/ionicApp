import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests: Array<HttpRequest<unknown>> = [];

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService
      .showLoader();

    this.requests
      .push(request);

    return next.handle(request)
      .pipe(finalize(() => {
        this.requests
          .pop();

        if (this.requests.length < 1) {
          this.loaderService.hideLoader();
        }
      }));
  }
}
