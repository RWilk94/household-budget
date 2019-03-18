import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationMenuService} from "../../services/navigation-menu.service";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;

  constructor(private navigationMenuService: NavigationMenuService, public registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.navigationMenuService.appDrawer = this.appDrawer;
  }


}
