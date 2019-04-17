import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {CookieService} from 'ngx-cookie-service';
import {ModuleVO} from '../../models/moduleVO';
import {NavigationExtras, Router} from '@angular/router';

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
        this.categoryVOs.forEach(categoryVO => {
          categoryVO.difference = categoryVO.plannedSpending - categoryVO.actualSpending;
          if (categoryVO.plannedSpending !== 0) {
            categoryVO.percent = Math.round(categoryVO.actualSpending * 100 / categoryVO.plannedSpending);
          } else {
            categoryVO.percent = 0;
          }
          categoryVO.open = false;
        });
      }, error => console.log(error));
    } else if (this.type === 'month') {
      this.categoryService.getCategoryVOsByMonth(this.moduleId, this.selectedYear, this.selectedMonth).subscribe(data => {
        console.log(data);
        this.categoryVOs = data;
        console.log(this.categoryVOs);
        this.categoryVOs.forEach(categoryVO => {
          categoryVO.difference = categoryVO.plannedSpending - categoryVO.actualSpending;
          if (categoryVO.plannedSpending !== 0) {
            categoryVO.percent = Math.round(categoryVO.actualSpending * 100 / categoryVO.plannedSpending);
          } else {
            categoryVO.percent = 0;
          }
          categoryVO.open = false;
        });
      }, error => console.log(error));
    }
  }

  plannedBudgetOnClick(rowNum: number) {
    console.log(rowNum);
    console.log(this.categoryVOs[rowNum].id);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'categoryId': this.categoryVOs[rowNum].id,
        'categoryName': this.categoryVOs[rowNum].name
      }
    };
    this.router.navigate(['/dashboard/planning_spending'], navigationExtras);
  }

  showSpendingOnClick() {
    this.router.navigate(['/dashboard/spending']);
  }
}
