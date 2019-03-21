import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {CategoryComponent} from './components/category/category.component';
import {SpendingComponent} from './components/spending/spending.component';
import {AddSpendComponent} from './components/add-spend/add-spend.component';
import {ModuleComponent} from './components/module/module.component';
import {PlanningSpendingComponent} from './components/planning-spending/planning-spending.component';
import {CreditsComponent} from './components/credits/credits.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'spending', component: SpendingComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'overview', component: ModuleComponent},
      {path: 'planning_spending', component: PlanningSpendingComponent},
      {path: 'credits', component: CreditsComponent},
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
