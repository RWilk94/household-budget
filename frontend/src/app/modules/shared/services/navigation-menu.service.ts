import {Injectable} from '@angular/core';
import {MenuItem} from "../models/menu-item";

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  public appDrawer: any;
  private show: boolean = true;

  menuItems: MenuItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'dashboard'
    },
    {
      displayName: 'Calendar',
      iconName: 'date_range',
      route: 'dashboard/calendar'
    },
    {
      displayName: 'Overview',
      iconName: 'explore',
      route: 'dashboard/overview'
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

  constructor() {
  }

  changeVisibilityOfNavigationMenu() {
    this.show ? this.hideNavigationMenu() : this.showNavigationMenu();
  }

  activeMenuItem(component: string) {
    this.menuItems.forEach(item => {
      item.active = item.displayName === component;
      if (item.children !== undefined && item.children.length > 0) {
        item.children.forEach(children => children.active = children.displayName === component);
      }
    });
  }

  private hideNavigationMenu() {
    this.show = !this.show;
    this.appDrawer.close();
  }

  private showNavigationMenu() {
    this.show = !this.show;
    this.appDrawer.open();
  }
}
