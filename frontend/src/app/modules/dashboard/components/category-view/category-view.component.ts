import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {CookieService} from "ngx-cookie-service";
import {ModuleVO} from "../../models/moduleVO";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  @Input() moduleId: number;
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Input() type: string;

  categoryVOs: ModuleVO[];

  constructor(private categoryService: CategoryService, private cookie: CookieService, private router: Router) {
    console.log(this.moduleId);
    console.log(this.selectedMonth);
    console.log(this.selectedYear);
    console.log(this.type);
  }

  ngOnInit() {
    if (this.type === 'year') {
      this.categoryService.getCategoryVOsByYear(this.moduleId, this.selectedYear).subscribe(data => {
        console.log(this.selectedYear);
        console.log(data);
        this.categoryVOs = data;
        this.categoryVOs.forEach(data => {
          data.difference = data.plannedSpending - data.actualSpending;
          if (data.plannedSpending !== 0) {
            data.percent = Math.round(data.actualSpending * 100 / data.plannedSpending);
          } else {
            data.percent = 0;
          }
          data.open = false;
        });
      }, error => console.log(error));
    } else if (this.type === 'month') {
      this.categoryService.getCategoryVOsByMonth(this.moduleId, this.selectedYear, this.selectedMonth).subscribe(data => {
        console.log(data);
        this.categoryVOs = data;
        console.log(this.categoryVOs);
        this.categoryVOs.forEach(data => {
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
  }

  plannedBudgetOnClick(rowNum: number) {
    console.log(rowNum);
    console.log(this.categoryVOs[rowNum].id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "categoryId": this.categoryVOs[rowNum].id,
        "categoryName": this.categoryVOs[rowNum].name
      }
    };
    this.router.navigate(["/dashboard/planning_spending"], navigationExtras);
  }

  showSpendingOnClick() {
    this.router.navigate(["/dashboard/spending"]);
  }
}
