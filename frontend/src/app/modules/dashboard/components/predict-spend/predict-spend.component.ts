import { Component, OnInit } from '@angular/core';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';

@Component({
  selector: 'app-predict-spend',
  templateUrl: './predict-spend.component.html',
  styleUrls: ['./predict-spend.component.css']
})
export class PredictSpendComponent implements OnInit {

  constructor(private navigationMenu: NavigationMenuService) {
    navigationMenu.activeMenuItem('Prognozy');
  }

  ngOnInit() {
  }

}
