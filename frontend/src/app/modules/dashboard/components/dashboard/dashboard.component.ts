import {Component, OnInit} from '@angular/core';
import {NavigationMenuService} from "../../../shared/services/navigation-menu.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private nav: NavigationMenuService) {
  }

  ngOnInit() {
  }

  clickNavBar() {
    this.nav.changeVisibilityOfNavigationMenu();
  }

}
