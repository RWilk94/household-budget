import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ModuleComponent} from "./components/module/module.component";
import {CategoryComponent} from "./components/category/category.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'module', component: ModuleComponent},
      {path: 'category', component: CategoryComponent}
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
