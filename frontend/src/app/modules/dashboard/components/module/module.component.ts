import {Component, OnInit} from '@angular/core';
import {NavigationMenuService} from "../../../shared/services/navigation-menu.service";
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  modules: Module[];

  moduleColumns = [
    {prop: 'name', name: 'NAME'},
    {prop: 'month', name: 'MONTH'},
    {prop: 'year', name: 'YEAR'},
  ];

  constructor(private navigationMenu: NavigationMenuService,
              private moduleService: ModuleService) {
    navigationMenu.activeMenuItem('Overview');
  }

  ngOnInit() {
    this.moduleService.getModules().subscribe(data => {
      this.modules = data;
      this.modules.forEach(module => module.open = false);
    }, error => console.log(error));

  }

  onRowClick(rowNum: number) {
    this.modules[rowNum].open = !this.modules[rowNum].open;
  }
}
