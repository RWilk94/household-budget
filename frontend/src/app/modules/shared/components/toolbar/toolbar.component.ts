import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {NavigationMenuService} from "../../services/navigation-menu.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  username: string = '';

  constructor(private registrationService: RegistrationService, private navigationMenuSercice: NavigationMenuService,
              private cookie: CookieService) { }

  ngOnInit() {
    this.username = this.cookie.get('username');
  }

  logout() {
    this.registrationService.logout();
  }

  changeVisibilityOfNavMenu() {
    this.navigationMenuSercice.changeVisibilityOfNavigationMenu();
  }

}
