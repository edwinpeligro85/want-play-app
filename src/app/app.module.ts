import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Angulartics2Module } from 'angulartics2';

import { environment } from '@env/environment';
import {
  RouteReusableStrategy,
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  SharedModule,
  HttpTokenInterceptor,
} from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './api/api.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { STORE_CONFIG } from './app.store.config';
import { appInitializer } from './app.initializer';
import { Store } from '@ngxs/store';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    Angulartics2Module.forRoot(),
    SweetAlert2Module.forRoot(),
    ...STORE_CONFIG,
    ApiModule.forRoot({ rootUrl: environment.serverUrl }),
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [Store],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    Keyboard,
    StatusBar,
    SplashScreen,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
