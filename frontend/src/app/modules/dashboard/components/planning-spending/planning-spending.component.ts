import {Component, OnInit} from '@angular/core';
import {ModuleService} from '../../services/module.service';
import {Module} from '../../models/module';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {CookieService} from 'ngx-cookie-service';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';
import {PlannedSpend} from '../../models/planned-spend';
import {User} from '../../../shared/models/user';
import {PlannedSpendingService} from '../../services/planned-spending.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-planning-spending',
  templateUrl: './planning-spending.component.html',
  styleUrls: ['./planning-spending.component.css']
})
export class PlanningSpendingComponent implements OnInit {

  selectedModule: Module;
  selectedCategory: Category;

  private plannedSpending: PlannedSpend[] = [];
  private selectedYear: number = new Date().getFullYear();
  year: number = new Date().getFullYear();
  private month: number = new Date().getMonth();
  constSpending: boolean;

  constructor(private moduleService: ModuleService,
              private categoryService: CategoryService,
              private cookie: CookieService,
              private navigationMenu: NavigationMenuService,
              private plannedSpendingService: PlannedSpendingService,
              private route: ActivatedRoute) {
    navigationMenu.activeMenuItem('Przegląd');
    this.resetPlannedSpending();

    this.route.queryParams.subscribe(params => {
      this.selectedCategory = new Category();
      this.selectedCategory.name = params['categoryName'];
      this.selectedCategory.id = params['categoryId'];
    });
  }

  ngOnInit() {
    console.log(this.selectedCategory.id);
    this.plannedSpendingService.getPlannedSpending(this.cookie.get('username'), this.selectedCategory.id, this.year).subscribe(
      data => {
        this.plannedSpending = data;
        this.plannedSpending.push(new PlannedSpend());
      }, error => console.log(error));
  }

  changeYearOnClick() {
    this.selectedYear = this.year;
    this.resetPlannedSpending();
    this.plannedSpendingService.getPlannedSpending(
      this.cookie.get('username'), this.selectedCategory.id, this.selectedYear)
      .subscribe(data => {
        this.plannedSpending = data;
        this.plannedSpending.push(new PlannedSpend());
        console.log(data);
      }, error => console.log(error));
  }

  onSubmit() {
    this.plannedSpending.forEach(spend => {
      spend.year = this.selectedYear;
      spend.month = this.plannedSpending.indexOf(spend) + 1;
      spend.category = this.selectedCategory;
      spend.user = new User();
      spend.user.username = this.cookie.get('username');
      if (this.plannedSpending[12].value !== null && this.plannedSpending[12].value !== undefined) {
        spend.value = this.plannedSpending[12].value;
      }
    });

    this.plannedSpendingService.savePlannedSpending(this.plannedSpending.filter(spend => spend.year === this.selectedYear))
      .subscribe(data => {
        this.plannedSpending = data;
        this.plannedSpending.push(new PlannedSpend());
      }, error => console.log(error));
  }

  onReset() {
    this.plannedSpending.forEach(spend => spend.value = null);
  }

  private resetPlannedSpending() {
    for (let i = 0; i < 13; i++) {
      this.plannedSpending[i] = new PlannedSpend();
    }
  }

}
