import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CaptureEmailCardComponent } from '../ui/capture-email-card/capture-email-card.component';
import { CreditResourcesCardComponent } from '../ui/credit-resources-card/credit-resources-card.component';
import { CreditResourcesComponent } from '../ui/credit-resources/credit-resources.component';
import { CustomDropdownComponent } from '../ui/custom-dropdown/custom-dropdown.component';
import { FinancialSolutionsCardComponent } from '../ui/financial-solutions-card/financial-solutions-card.component';
import { FinancialSolutionsComponent } from '../ui/financial-solutions/financial-solutions.component';
import { HeaderDLevel1Component } from '../ui/header-desktop/header-d-level1/header-d-level1.component';
import { HeaderDLevel2Component } from '../ui/header-desktop/header-d-level2/header-d-level2.component';
import { HeaderDLevel3Component } from '../ui/header-desktop/header-d-level3/header-d-level3.component';
import { HeaderDesktopComponent } from '../ui/header-desktop/header-desktop.component';
import { HeaderMobileNavListComponent } from '../ui/header-mobile-nav-list/header-mobile-nav-list.component';
import { HeaderMobileNavTertiaryComponent } from '../ui/header-mobile-nav-tertiary/header-mobile-nav-tertiary.component';
import { HeaderMobileNavComponent } from '../ui/header-mobile-nav/header-mobile-nav.component';
import { HeaderMobileComponent } from '../ui/header-mobile/header-mobile.component';
import { HorizontalScrollContainerComponent } from '../ui/horizontal-scroll-container/horizontal-scroll-container.component';
import { KcArticleCardComponent } from '../ui/kc-article-card/kc-article-card.component';
import { KcSeriesArticlesComponent } from '../ui/kc-series-articles/kc-series-articles.component';
import { ProgressBarComponent } from '../ui/progress-bar/progress-bar.component';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ExternalLinkDirective } from './directives/external-link.directive';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import { SetTopDirective } from './directives/Set-top.directive';
import { ShareUrlDirective } from './directives/share-url.directive';
import { TargetBlankDirective } from './directives/target-blank.directive';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { LoaderComponent } from './loader/loader.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TealiumClickEventDirective } from './tealium/directives/tealium-click-event.directive';
import { EmailSuccessMessageComponent } from '../ui/email-success-message/email-success-message.component';
import { MutationObserverDirective } from './directives/mutation-observer.directive';
import { TextHighlightDirective } from './directives/text-highlight.directive';

@NgModule({
  declarations: [
    MutationObserverDirective,
    BackgroundColorDirective,
    EllipsisPipe,
    ExternalLinkDirective,
    FinancialSolutionsCardComponent,
    FinancialSolutionsComponent,
    HeaderDesktopComponent,
    HeaderDLevel1Component,
    HeaderDLevel2Component,
    HeaderDLevel3Component,
    HeaderMobileComponent,
    HeaderMobileNavComponent,
    HeaderMobileNavListComponent,
    HeaderMobileNavTertiaryComponent,
    ImageLoaderDirective,
    LoaderComponent,
    ProgressBarComponent,
    SetTopDirective,
    SafePipe,
    TargetBlankDirective,
    TealiumClickEventDirective,
    CreditResourcesComponent,
    CreditResourcesCardComponent,
    HorizontalScrollContainerComponent,
    CustomDropdownComponent,
    ThrottleClickDirective,
    ClickOutsideDirective,
    CaptureEmailCardComponent,
    KcArticleCardComponent,
    KcSeriesArticlesComponent,
    ShareUrlDirective,
    EmailSuccessMessageComponent,
    TextHighlightDirective
  ],
  exports: [
    MutationObserverDirective,
    CommonModule,
    EllipsisPipe,
    ExternalLinkDirective,
    BackgroundColorDirective,
    FinancialSolutionsCardComponent,
    FinancialSolutionsComponent,
    HeaderDesktopComponent,
    HeaderDLevel1Component,
    HeaderDLevel2Component,
    HeaderDLevel3Component,
    HeaderMobileComponent,
    HeaderMobileNavComponent,
    ImageLoaderDirective,
    LoaderComponent,
    ProgressBarComponent,
    SafePipe,
    TargetBlankDirective,
    TealiumClickEventDirective,
    CreditResourcesComponent,
    CreditResourcesCardComponent,
    HorizontalScrollContainerComponent,
    CustomDropdownComponent,
    ThrottleClickDirective,
    ClickOutsideDirective,
    CaptureEmailCardComponent,
    KcArticleCardComponent,
    KcSeriesArticlesComponent,
    ShareUrlDirective,
    EmailSuccessMessageComponent,
    TextHighlightDirective
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatDialogModule,
    FormsModule
  ]
})
export class SharedModule { }
