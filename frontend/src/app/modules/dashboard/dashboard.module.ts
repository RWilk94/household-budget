import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {TestComponent} from './components/test/test.component';
import {ToasterModule} from "angular2-toaster";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToasterModule.forRoot(),
  ],
  providers: [],
  declarations: [DashboardComponent, TestComponent]
})
export class DashboardModule {
}
