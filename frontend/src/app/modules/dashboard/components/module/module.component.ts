import {Component, OnInit} from '@angular/core';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';
import {ModuleService} from '../../services/module.service';
import {Module} from '../../models/module';
import {ModuleVO} from '../../models/moduleVO';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  modules: Module[];
  moduleVOs: ModuleVO[];
  selectedMonth: number = this.selectCurrentMonth();
  // selectedYear: number = this.selectCurrentYear();

  year = new Date().getFullYear();
  month = '2019-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1));

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
    // console.log('moduleComponent');
    this.moduleService.getModules().subscribe(data => {
      this.modules = data;
      this.modules.forEach(module => module.open = false);
    }, error => console.log(error));

    this.getModuleVO();
  }

  onRowClick(rowNum: number) {
    this.moduleVOs[rowNum].open = !this.moduleVOs[rowNum].open;
    // if (this.moduleVOs[rowNum].open === true) {
    //   this.moduleVOs[rowNum].open = false;
    // } else {
    //   this.moduleVOs[rowNum].open = true;
    // }
  }

  selectedMonthOnChange() {
    // this.getModuleVO();
    console.log(this.month);
  }

  selectedYearOnChange() {
    // if (this.type === 'year') {
    //   this.selectedMonth = 1;
    //   this.getModuleVO();
    // } else {
    //   this.selectedMonth = 0;
    // }
  }

  selectedTypeOnChange() {
    // this.selectedMonth = 0;
    // this.selectedYear = 0;
  }

  private getModuleVO() {
    if (this.type === 'year') {
      this.moduleService.getModulesVOsByYear(this.year).subscribe(data => {
        this.moduleVOs = data;
        this.moduleVOs.forEach(moduleVO => {
          moduleVO.difference = moduleVO.plannedSpending - moduleVO.actualSpending;
          if (moduleVO.plannedSpending !== 0) {
            moduleVO.percent = Math.round(moduleVO.actualSpending * 100 / moduleVO.plannedSpending);
          } else {
            moduleVO.percent = 0;
          }
          moduleVO.open = false;
        });
      }, error => console.log(error));
    } else if (this.type === 'month') {
      this.moduleService.getModulesVOsByMonth(this.year, Number.parseInt(this.month.substring(5), 10)).subscribe(data => {
        this.moduleVOs = data;
        this.moduleVOs.forEach(moduleVO => {
          moduleVO.difference = moduleVO.plannedSpending - moduleVO.actualSpending;
          if (moduleVO.plannedSpending !== 0) {
            moduleVO.percent = Math.round(moduleVO.actualSpending * 100 / moduleVO.plannedSpending);
          } else {
            moduleVO.percent = 0;
          }
          moduleVO.open = false;
        });
      }, error => console.log(error));
    }

    // this.moduleService.getModuleVOs(new Date(this.selectedYear, this.selectedMonth, 1), this.type).subscribe(data => {
    //   this.moduleVOs = data;
    //   this.moduleVOs.forEach(data => {
    //     data.difference = data.plannedSpending - data.actualSpending;
    //     if (data.plannedSpending !== 0) {
    //       data.percent = Math.round(data.actualSpending * 100 / data.plannedSpending);
    //     } else {
    //       data.percent = 0;
    //     }
    //     data.open = false;
    //   });
    // }, error => console.log(error));
  }

  private selectCurrentMonth() {
    const date = new Date();
    return date.getMonth() + 1;
  }

  private selectCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }

  typeModelChange() {
    console.log(this.type);
  }

  changeDatePeriod() {
    // console.log(this.type);
    this.selectedMonth = Number.parseFloat(this.month.substr(this.month.lastIndexOf('-') + 1));
    // console.log(this.selectedMonth);
    this.getModuleVO();
  }
}
