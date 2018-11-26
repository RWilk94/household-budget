import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {NavigationMenuService} from "../../services/navigation-menu.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private navigationMenuSercice: NavigationMenuService) { }

  ngOnInit() {
  }

  logout() {
    this.registrationService.logout();
  }

  changeVisibilityOfNavMenu() {
    this.navigationMenuSercice.changeVisibilityOfNavigationMenu();
  }

}
