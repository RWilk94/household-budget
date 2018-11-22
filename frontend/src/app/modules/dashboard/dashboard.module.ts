import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NavigationMenuComponent} from './components/navigation-menu/navigation-menu.component';
import {NavigationMenuItemComponent} from './components/navigation-menu-item/navigation-menu-item.component';
import {MatIconModule, MatListModule, MatSidenavModule} from "@angular/material";
import {NavigationMenuService} from "./services/navigation-menu.service";
import {SharedModule} from "../shared/shared.module";
import { TestComponent } from './components/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [NavigationMenuService],
  declarations: [DashboardComponent, ToolbarComponent, NavigationMenuComponent, NavigationMenuItemComponent, TestComponent]
})
export class DashboardModule {
}
