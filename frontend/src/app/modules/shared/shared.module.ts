import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from "./auth/auth-guard.service";
import {DefaultRouteResolver} from './auth/default-route-resolver';
import {RegistrationService} from "./services/registration.service";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DefaultRouteResolver],
  providers: [
    AuthGuardService,
    RegistrationService,
    CookieService
  ]
})
export class SharedModule {
}
