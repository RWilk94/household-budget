import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ToasterModule} from "angular2-toaster";
import {CategoryComponent} from './components/category/category.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import {CategoryService} from "./services/category.service";
import {ModuleService} from "./services/module.service";
import {DialogConfirmDeleteComponent} from './components/dialog-confirm-delete/dialog-confirm-delete.component';
import {SpendingComponent} from './components/spending/spending.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {ContextMenuModule} from 'ngx-contextmenu';
import {AddSpendComponent} from './components/add-spend/add-spend.component';
import {NgbDatepickerModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ModuleComponent} from './components/module/module.component';
import {CategoryViewComponent} from './components/category-view/category-view.component';
import {SpendingViewComponent} from './components/spending-view/spending-view.component';
import { PlanningSpendingComponent } from './components/planning-spending/planning-spending.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    NgbModalModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgbModule
  ],
  entryComponents: [DialogConfirmDeleteComponent],
  providers: [
    CategoryService,
    ModuleService,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  declarations: [DashboardComponent, CategoryComponent, CalendarComponent, DialogConfirmDeleteComponent, SpendingComponent,
    AddSpendComponent, ModuleComponent, CategoryViewComponent, SpendingViewComponent, PlanningSpendingComponent]
})
export class DashboardModule {
}
