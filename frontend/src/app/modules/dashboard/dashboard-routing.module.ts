import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "./components/test/test.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard/test', component: TestComponent}
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
