import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  public appDrawer: any;
  private show: boolean = true;

  constructor() { }

  changeVisibilityOfNavigationMenu() {
    this.show ? this.hideNavigationMenu() : this.showNavigationMenu();
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
