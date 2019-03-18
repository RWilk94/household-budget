import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../../models/menu-item";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navigation-menu-item',
  templateUrl: './navigation-menu-item.component.html',
  styleUrls: ['./navigation-menu-item.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavigationMenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  @Input() depth: number;
  expand: boolean;

  constructor(private router: Router) {
    this.expand = false;
    this.depth = 0;
  }

  ngOnInit() {
  }

  onItemSelected(item: MenuItem) {
    if (!item.children || !item.children.length) {
      this.menuItem.active = true;
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expand = !this.expand;
    }
  }

}
