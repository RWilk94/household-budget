import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CategoryComponent} from "./components/category/category.component";
import {SpendingComponent} from "./components/spending/spending.component";
import {AddSpendComponent} from "./components/add-spend/add-spend.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'spending', component: SpendingComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'add-spend', component: AddSpendComponent},
      {path: 'add-spend/:id', component: AddSpendComponent}
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
