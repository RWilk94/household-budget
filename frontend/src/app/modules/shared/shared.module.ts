import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from "./auth/auth-guard.service";
import {DefaultRouteResolver} from './auth/default-route-resolver';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DefaultRouteResolver],
  providers: [
    AuthGuardService
  ]
})
export class SharedModule {
}
