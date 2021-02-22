import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaderStatus$: Observable<boolean> = this.loader.asObservable();

  constructor() { }

  public hideLoader(): void {
    this.loader.next(false);
  }

  public showLoader(): void {
    this.loader.next(true);
  }
}
