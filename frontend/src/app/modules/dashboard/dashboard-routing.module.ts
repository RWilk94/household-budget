import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "./components/test/test.component";
import {NavigationMenuComponent} from "./components/navigation-menu/navigation-menu.component";

const routes: Routes = [
  {
    path: '',
    // outlet: 'child',
    children: [
      {path: '', component: NavigationMenuComponent},
      {path: 'dashboard/test', component: TestComponent},
      // {path: '**', component: TestComponent}
    ]
  },
  {path: '**', component: TestComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
