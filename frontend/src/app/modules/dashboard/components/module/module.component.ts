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
  selectedMonth: number = this.selectCurrentMonth();
  selectedYear: number = this.selectCurrentYear();
  type: string = 'month';

  moduleColumns = [
    {prop: 'name', name: 'Nazwa'},
    {prop: 'plannedSpend', name: 'Planowane wydatki'},
    {prop: 'actualSpend', name: 'Rzeczywiste wydatki'},
    {prop: 'difference', name: 'Różnica'},
    {prop: 'percent', name: 'Stopień realizacji budżetu'},
    {prop: 'option', name: 'Akcje'},
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
  }

  onRowClick(rowNum: number) {
    if (this.moduleVOs[rowNum].open === true) {
      this.moduleVOs[rowNum].open = false;
    } else {
      this.moduleVOs[rowNum].open = true;
    }
  }

  selectedMonthOnChange() {
    this.getModuleVO();
  }

  selectedYearOnChange() {
    if (this.type === 'year') {
      this.selectedMonth = 1;
      this.getModuleVO();
    } else {
      this.selectedMonth = 0;
    }
  }

  selectedTypeOnChange() {
    this.selectedMonth = 0;
    this.selectedYear = 0;
  }

  private getModuleVO() {
    this.moduleService.getModuleVOs(new Date(this.selectedYear, this.selectedMonth, 1), this.type).subscribe(data => {
      this.moduleVOs = data;
      this.moduleVOs.forEach(data => {
        data.difference = data.plannedSpending - data.actualSpending;
        if (data.plannedSpending !== 0) {
          data.percent = Math.round(data.actualSpending * 100 / data.plannedSpending);
        } else {
          data.percent = 0;
        }
        data.open = false;
      });
    }, error => console.log(error));
  }

  private selectCurrentMonth() {
    let date = new Date();
    return date.getMonth() + 1;
  }

  private selectCurrentYear() {
    let date = new Date();
    return date.getFullYear();
  }

}
