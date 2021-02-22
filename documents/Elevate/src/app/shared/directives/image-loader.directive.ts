import {
    Directive,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import {
    combineLatest,
    Observable,
    Subscription
} from 'rxjs';
import {
    map,
    tap
} from 'rxjs/operators';

import { AppContentName } from 'src/app/enums/app-content-name.enum';
import { Image } from 'src/app/models/image.model';
import { isMobile } from 'src/app/utils/is-mobile-observable.util';
import { AppCommonDataService } from '../services/app-common-data.service';

@Directive({
    selector: '[appImageLoader]'
})
export class ImageLoaderDirective implements OnChanges, OnDestroy {

    @HostBinding('class.hidden') get hidden(): boolean { return !this.imageSource; }

    @HostBinding('attr.alt') imageAlternative: string = 'image';

    @HostBinding('attr.src') imageSource: string;

    @Input() imageId: string;

    private subscription: Subscription = new Subscription();

    constructor(private appCommonDataService: AppCommonDataService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.imageId.currentValue) {
            this.subscription
                .unsubscribe();

            const image: Observable<Image> = this.appCommonDataService
                .getAppCommonData<Image>(AppContentName.Image, changes.imageId.currentValue);

            this.subscription = combineLatest([image, isMobile])
                .pipe(
                    map((results: [Image, boolean]) => {
                        return { image: results[0], isMobile: results[1] };
                    }),
                    tap((results: { image: Image, isMobile: boolean }) => {
                        this.imageAlternative = results.image.alt;
                        this.imageSource = !results.isMobile ?
                            this.imageSource = results.image.attachments[1] || results.image.attachments[0] :
                            this.imageSource = results.image.attachments[0];
                    })
                )
                .subscribe();
        }
    }

    ngOnDestroy(): void {
        this.subscription
            .unsubscribe();
    }

}
