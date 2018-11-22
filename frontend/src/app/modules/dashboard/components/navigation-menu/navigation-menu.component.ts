import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationMenuService} from "../../services/navigation-menu.service";
import {MenuItem} from "../../models/menu-item";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;

  constructor(private navigationMenuService: NavigationMenuService) { }

  menuItems: MenuItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'explore',
      route: 'dashboard'
    },
    {
      displayName: 'Home',
      iconName: 'home',
      children: [
        {
          displayName: 'Overview',
          iconName: 'explore',
          route: 'dashboard/test'
        },
        {
          displayName: 'Spending',
          iconName: 'money',
          route: 'spending'
        },
        {
          displayName: 'Categories',
          iconName: 'restaurant',
          route: 'categories'
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
