import {Injectable} from '@angular/core';
import {MenuItem} from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  public appDrawer: any;
  private show: boolean = true;

  menuItems: MenuItem[] = [
    {
      displayName: 'Tablica',
      iconName: 'dashboard',
      route: 'dashboard'
    },
    {
      displayName: 'Kalendarz',
      iconName: 'date_range',
      route: 'dashboard/calendar'
    },
    {
      displayName: 'Przegląd',
      iconName: 'explore',
      route: 'dashboard/overview'
    },
    {
      displayName: 'Wydatki',
      iconName: 'payment',
      route: 'dashboard/spending'
    },
    {
      displayName: 'Kalkulator kredytowy',
      iconName: 'money',
      route: 'dashboard/credits'
    },
    {
      displayName: 'Ustawienia',
      iconName: 'settings',
      children: [
        {
          displayName: 'Kategorie',
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
