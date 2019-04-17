import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './modules/shared/auth/auth-guard.service';
import {DefaultRouteResolverComponent} from './modules/shared/auth/default-route-resolver';
import {DashboardGuardService} from './modules/shared/auth/dashboard-guard.service';

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
    component: DefaultRouteResolverComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
