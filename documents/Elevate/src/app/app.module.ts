import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { FooterComponent } from './ui/footer/footer.component';
import { CookieBannerComponent } from './ui/cookie-banner/cookie-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    CookieBannerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
