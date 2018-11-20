import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "./modules/shared/auth/auth-guard.service";
import {DefaultRouteResolver} from "./modules/shared/auth/default-route-resolver";
import {DashboardGuardService} from "./modules/shared/auth/dashboard-guard.service";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    canLoad: [DashboardGuardService],
    canActivate: [DashboardGuardService]
  },
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule',
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: DefaultRouteResolver
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
