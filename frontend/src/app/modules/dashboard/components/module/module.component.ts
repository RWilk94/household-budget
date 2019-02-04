import {Component, OnInit} from '@angular/core';
import {NavigationMenuService} from "../../../shared/services/navigation-menu.service";
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";
import {ModuleVO} from "../../models/moduleVO";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  modules: Module[];
  moduleVOs: ModuleVO[];
  selectedMonth: string = this.selectCurrentMonth();

  moduleColumns = [
    {prop: 'name', name: 'Nazwa'},
    {prop: 'plannedSpend', name: 'Planowane wydatki'},
    {prop: 'actualSpend', name: 'Rzeczywiste wydatki'},
    {prop: 'difference', name: 'Różnica'},
    {prop: 'percent', name: 'Stopień realizacji budżetu'},
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

    this.getModuleVO();
    // this.moduleService.getModuleVOs(new Date(this.selectedMonth)).subscribe(data => {
    //   console.log(data);
    //   this.moduleVOs = data;
    //   this.moduleVOs.forEach(data => {
    //     data.difference = data.plannedSpending - data.actualSpending;
    //     if (data.plannedSpending !== 0) {
    //       data.percent = Math.round(data.actualSpending * 100 / data.plannedSpending);
    //     } else {
    //       data.percent = 0;
    //     }
    //   });
    // }, error => console.log(error));
  }

  onRowClick(rowNum: number) {
    this.modules[rowNum].open = !this.modules[rowNum].open;
  }

  selectedMonthOnChange() {
    this.getModuleVO();
  }

  private getModuleVO() {
    this.moduleService.getModuleVOs(new Date(this.selectedMonth)).subscribe(data => {
      this.moduleVOs = data;
      this.moduleVOs.forEach(data => {
        data.difference = data.plannedSpending - data.actualSpending;
        if (data.plannedSpending !== 0) {
          data.percent = Math.round(data.actualSpending * 100 / data.plannedSpending);
        } else {
          data.percent = 0;
        }
      });
    }, error => console.log(error));
  }

  private selectCurrentMonth() {
    let date = new Date();
    if (date.getMonth()+1 < 10) {
      return date.getFullYear().toString() + '-0' + (date.getMonth()+1).toString() + '-01';
    } else {
      // console.log(date.getFullYear().toString() + '-' + date.getMonth().toString() + '-01');
      return date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-01';
    }
  }

}
