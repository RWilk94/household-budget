import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from "./auth/auth-guard.service";
import {DefaultRouteResolver} from './auth/default-route-resolver';
import {RegistrationService} from "./services/registration.service";
import {CookieService} from "ngx-cookie-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HTTPStatusService, SpinnerInterceptor} from "./services/spinner-interceptor";
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NavigationMenuComponent} from "./components/navigation-menu/navigation-menu.component";
import {NavigationMenuItemComponent} from "./components/navigation-menu-item/navigation-menu-item.component";
import {NavigationMenuService} from "./services/navigation-menu.service";
import {MatIconModule, MatListModule, MatSidenavModule} from "@angular/material";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule
  ],
  declarations: [DefaultRouteResolver, SpinnerComponent, NavigationMenuComponent, NavigationMenuItemComponent, ToolbarComponent],
  providers: [
    AuthGuardService,
    RegistrationService,
    CookieService,
    HTTPStatusService,
    SpinnerComponent,
    NavigationMenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
      deps: [HTTPStatusService]
    },
  ],
  exports: [SpinnerComponent, NavigationMenuComponent, ToolbarComponent]
})
export class SharedModule {
}
