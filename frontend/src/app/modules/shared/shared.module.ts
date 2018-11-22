import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from "./auth/auth-guard.service";
import {DefaultRouteResolver} from './auth/default-route-resolver';
import {RegistrationService} from "./services/registration.service";
import {CookieService} from "ngx-cookie-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HTTPStatusService, SpinnerInterceptor} from "./services/spinner-interceptor";
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DefaultRouteResolver, SpinnerComponent],
  providers: [
    AuthGuardService,
    RegistrationService,
    CookieService,
    HTTPStatusService,
    SpinnerComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
      deps: [HTTPStatusService]
    },
  ],
  exports: [SpinnerComponent]
})
export class SharedModule {
}
