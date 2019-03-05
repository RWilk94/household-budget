import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {CookieService} from "ngx-cookie-service";
import {NavigationMenuService} from "../../../shared/services/navigation-menu.service";
import {PlannedSpend} from "../../models/planned-spend";
import {User} from "../../../shared/models/user";
import {PlannedSpendingService} from "../../services/planned-spending.service";

@Component({
  selector: 'app-planning-spending',
  templateUrl: './planning-spending.component.html',
  styleUrls: ['./planning-spending.component.css']
})
export class PlanningSpendingComponent implements OnInit {

  moduleColumns = [
    {prop: 'name', name: 'Nazwa'},
    {prop: 'plannedSpend', name: 'Planowane wydatki'},
    {prop: 'option', name: 'Akcje'}
  ];

  categoryColumns = [
    {prop: 'name', name: 'Nazwa'},
    {prop: 'plannedSpend', name: 'Planowane wydatki'},
    {prop: 'option', name: 'Akcje'}
  ];

  private modules: Module[];
  private categories: Category[];
  private selectedModule: Module;
  private displayedCategories: Category[];
  private selectedCategory: Category;

  private plannedSpending: PlannedSpend[] = [];
  private selectedYear: number;
  private year: number = new Date().getFullYear();
  constSpending: boolean;

  moduleMode: boolean = true;
  categoryMode: boolean = false;
  categoryDetailMode: boolean = false;

  constructor(private moduleService: ModuleService,
              private categoryService: CategoryService,
              private cookie: CookieService,
              private navigationMenu: NavigationMenuService,
              private plannedSpendingService: PlannedSpendingService) {
    this.navigationMenu.activeMenuItem('Planning Spending');

    this.resetPlannedSpending();
  }

  ngOnInit() {
    this.moduleService.getModules().subscribe(data => {
      //console.log(data);
      this.modules = data;
    }, error => console.log(error));

    this.categoryService.getCategories(this.cookie.get('username')).subscribe(data => {
      //console.log(data);
      this.categories = data;
    }, error => console.log(error));
  }

  selectModuleOnClick(moduleIndex) {
    this.selectedModule = this.modules[moduleIndex];
    this.displayedCategories = this.categories.filter(category => category.module.id === this.selectedModule.id);
    this.moduleMode = false;
    this.categoryMode = true;
    this.categoryDetailMode = false;
  }

  selectCategoryOnClick(categoryIndex) {
    this.selectedCategory = this.displayedCategories[categoryIndex];
    this.moduleMode = false;
    this.categoryMode = false;
    this.categoryDetailMode = true;

    this.plannedSpendingService.getPlannedSpending(
      this.cookie.get('username'),
      this.selectedCategory.id,
      this.year).subscribe(data => {
      this.plannedSpending = data;
      this.plannedSpending.push(new PlannedSpend());
      console.log(data);
    }, error => console.log(error));
  }

  redirectToModulesOnClick() {
    this.selectedModule = null;
    this.selectedCategory = null;
    this.moduleMode = true;
    this.categoryMode = false;
    this.categoryDetailMode = false;
    this.resetPlannedSpending();
  }

  redirectToModuleOnClick() {
    this.selectedCategory = null;
    this.moduleMode = false;
    this.categoryMode = true;
    this.categoryDetailMode = false;
    this.resetPlannedSpending();
  }

  changeYearOnClick() {
    this.selectedYear = this.year;
    this.resetPlannedSpending();
  }

  onSubmit() {
    this.plannedSpending.forEach(spend => {
      //spend.date = new Date(this.year, this.plannedSpending.indexOf(spend), 1);
      spend.date = this.convertDate(new Date(this.year, this.plannedSpending.indexOf(spend), 1));
      spend.category = this.selectedCategory;
      spend.user = new User();
      spend.user.username = this.cookie.get('username');
      // console.log(spend.value);
      if (this.plannedSpending[12].value !== null && this.plannedSpending[12].value !== undefined) {
        spend.value = this.plannedSpending[12].value;
      }
    });

    this.plannedSpendingService.savePlannedSpending(this.plannedSpending.filter(spend => spend.date.getFullYear() === this.year))
      .subscribe(data => {
        this.plannedSpending = data;
        this.plannedSpending.push(new PlannedSpend());
        console.log(data);
      }, error => console.log(error));
  }

  onReset() {
    this.plannedSpending.forEach(spend => spend.value = null);
  }

  private convertDate(date: Date) {
    let tempDate = new Date(date);
    tempDate.setHours(Math.abs(date.getTimezoneOffset()) / 60);
    return tempDate;
  }

  private resetPlannedSpending() {
    for (let i = 0; i < 13; i++) {
      this.plannedSpending[i] = new PlannedSpend();
    }
  }
}
