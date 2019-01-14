import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationMenuService} from "../../services/navigation-menu.service";
import {MenuItem} from "../../models/menu-item";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;

  constructor(private navigationMenuService: NavigationMenuService, public registrationService: RegistrationService) { }

  menuItems: MenuItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'explore',
      route: 'dashboard',
      active: true
    },
    {
      displayName: 'Calendar',
      iconName: 'date_range',
      route: 'dashboard/calendar'
    },
    {
      displayName: 'Spending',
      iconName: 'payment',
      route: 'dashboard/spending'
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      children: [
        {
          displayName: 'Categories',
          iconName: 'category',
          route: 'dashboard/category'
        }
      ]
    }
  ];

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.navigationMenuService.appDrawer = this.appDrawer;
  }



}
