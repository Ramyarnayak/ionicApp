import { fromEvent, Observable } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith
} from 'rxjs/operators';

import { MOBILE_MAX_BREAK_POINT } from './consts.util';

export const isMobile: Observable<boolean> = fromEvent(window, 'resize')
    .pipe(
        map((event: Event) => {
            const window: Window = event.target as Window;

            return window.innerWidth;
        }),
        startWith(window.innerWidth),
        distinctUntilChanged(),
        debounceTime(250),
        map((viewportWidth: number) => viewportWidth <= MOBILE_MAX_BREAK_POINT)
    );
