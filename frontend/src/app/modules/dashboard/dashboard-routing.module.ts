import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: '**', component: DashboardComponent}
    ]
  },
  {path: '**', component: DashboardComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
