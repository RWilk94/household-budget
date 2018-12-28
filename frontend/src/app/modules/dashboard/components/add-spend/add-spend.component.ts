import {Component, OnInit} from '@angular/core';
import {Spend} from "../../models/spend";
import {ModuleService} from "../../services/module.service";
import {Router} from "@angular/router";
import {SpendingService} from "../../services/spending.service";
import {CookieService} from "ngx-cookie-service";
import {Module} from "../../models/module";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ToastBuilder} from "../../../shared/utils/toast-builder";
import {Toast, ToasterService} from "angular2-toaster";
import {User} from "../../../shared/models/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-spend',
  templateUrl: './add-spend.component.html',
  styleUrls: ['./add-spend.component.css']
})
export class AddSpendComponent implements OnInit {

  spend: Spend = new Spend();

  modules: Module[] = [];
  modulesSelectItem: any = [];
  selectedModule: any;

  categories: Category[] = [];
  categoriesSelectItem: any = [];
  selectedCategory: any;

  date: NgbDateStruct;
  alert: Alert;

  private id;

  constructor(private spendingService: SpendingService,
              private moduleService: ModuleService,
              private categoryService: CategoryService,
              private router: Router,
              private cookie: CookieService,
              private toasterService: ToasterService) {
    this.spend.category = new Category();
    this.spend.category.module = new Module();
  }

  ngOnInit() {
    this.id = this.router.url.toString().substring(this.router.url.toString().lastIndexOf("/") + 1);
    if (!Number.isNaN(Number.parseInt(this.id))) {
      this.spendingService.getSpendingById(this.cookie.get('username'), Number.parseInt(this.id)).subscribe(spend => {
        this.spend = spend;
        this.setSelectedCategory();
        this.setSelectedModule();
        let date = new Date(this.spend.date);
        this.date = {year: date.getUTCFullYear(), month: date.getUTCMonth(), day: date.getUTCDate()};
      });
    } else {
      this.spend.user = new User();
      this.spend.user.username = this.cookie.get('username');
    }

    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules;
      this.mapModulesIntoModuleSelect();
    }, error => console.log(error));

    this.categoryService.getCategories(this.cookie.get('username')).subscribe(categories => {
      this.categories = categories;
      this.mapCategoriesIntoCategorySelect();
    }, error => console.log(error));
  }

  onSubmit() {
    if (this.validateSpend(this.spend) && !Number.isNaN(Number.parseInt(this.id))) {
      this.spendingService.updateSpend(this.spend).subscribe(spend => {
        this.alert = {
          type: 'success',
          message: 'Record updated successfully.',
        };
      }, error => {
        console.log(error);
        this.displayToast(ToastBuilder.errorWhileUpdatingItem());
      });
    } else if (this.validateSpend(this.spend) && Number.isNaN(Number.parseInt(this.id))) {
      this.spendingService.addSpend(this.spend).subscribe(spend => {
        this.alert = {
          type: 'success',
          message: 'Record added successfully.',
        };
      }, error => {
        console.log(error);
        this.displayToast(ToastBuilder.errorWhileInsertingItem());
      });
    }
  }

  compareModules(m1: Module, m2: Module): boolean {
    if (m1 !== undefined && m2 !== undefined) {
      return m1.name === m2.name && m2.id === m2.id;
    }
  }

  compareCategories(c1: Category, c2: Category): boolean {
    if (c1 !== undefined && c2 !== undefined) {
      return c1.name === c2.name && c2.id === c2.id;
    }
  }

  updateSpendDateOnBlur(date: Date) {
    this.spend.date = date;
  }

  mapModulesIntoModuleSelect(): any {
    this.modulesSelectItem = this.modules.map(module => {
      return {id: module.id, name: module.name}
    });
  }

  setSelectedModule() {
    this.selectedModule = {id: this.spend.category.module.id, name: this.spend.category.module.name};
  }

  selectModuleNgModelChange() {
    this.selectedCategory = null;
    this.mapCategoriesIntoCategorySelect();
    this.spend.category = new Category();
  }

  mapCategoriesIntoCategorySelect() {
    this.categoriesSelectItem = this.categories
      .filter(category => this.selectedModule !== undefined && this.selectedModule !== null
        && this.selectedModule.id !== undefined && this.selectedModule.id !== null
        && category.module.id === this.selectedModule.id && category.module.name === this.selectedModule.name)
      .map(category => {
        return {id: category.id, name: category.name}
      });
  }

  setSelectedCategory() {
    this.selectedCategory = {id: this.spend.category.id, name: this.spend.category.name};
  }

  selectCategoryNgModelChange() {
    this.spend.category = this.categories.filter(category => this.selectedCategory !== undefined && this.selectedCategory !== null
      && this.selectedCategory.id !== undefined && this.selectedCategory.id !== null
      && category.id === this.selectedCategory.id && category.name === this.selectedCategory.name)[0];
  }

  selectDateNgModelChange() {
    this.spend.date = new Date(this.date.year, this.date.month - 1, this.date.day);
    this.spend.date.setHours(Math.abs(this.spend.date.getTimezoneOffset()) / 60);
  }

  private validateSpend(element: Spend): boolean {
    if (element.name === null || element.name === undefined || element.name.length === 0) {
      this.displayToast(ToastBuilder.errorEmptyName());
      return false;
    } else if (element.name.length < 1 || element.name.length > 255) {
      this.displayToast(ToastBuilder.errorIncorrectName());
      return false;
    } else if (element.category === null || element.category === undefined || element.category.name === '') {
      this.displayToast(ToastBuilder.errorEmptyCategory());
      return false;
    } else if (element.category.module === null || element.category.module === undefined || element.category.module.name === '') {
      this.displayToast(ToastBuilder.errorEmptyModule());
      return false;
    } else if (element.date === null || element.date === undefined) {
      this.displayToast(ToastBuilder.errorEmptyDate());
      return false;
    } else if (element.value === null || element.value === undefined || element.value < 0 || element.value.toString().length === 0) {
      this.displayToast(ToastBuilder.errorWrongValue());
      return false;
    }
    return true;
  }

  private displayToast(toast: Toast): void {
    this.toasterService.pop(toast);
  }

  closeAlert() {
    this.alert = undefined;
  }

}
