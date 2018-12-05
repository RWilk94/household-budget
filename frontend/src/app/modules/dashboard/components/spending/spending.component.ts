import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MAT_DATE_FORMATS, MatTableDataSource} from "@angular/material";
import {SpendElement} from "./spend-element";
import {Spend} from "../../models/spend";
import {CategoryService} from "../../services/category.service";
import {ModuleService} from "../../services/module.service";
import {ToasterService} from "angular2-toaster";
import {Module} from "../../models/module";
import {Category} from "../../models/category";
import {CookieService} from "ngx-cookie-service";
import {SpendingService} from "../../services/spending.service";
import {FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/user";

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class SpendingComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  spending: Spend[] = [];
  modules: Module[] = [];
  categories: Category[] = [];

  columns = ['position', 'name', 'module', 'category', 'date', 'value', 'options'];
  width = [5, 40, 10, 15, 10, 10, 10];

  dataSource = new MatTableDataSource<SpendElement>(this.convertSpendingIntoSpendElements(this.spending));

  constructor(private categoryService: CategoryService,
              private moduleService: ModuleService,
              private spendingService: SpendingService,
              private toasterService: ToasterService,
              private cookie: CookieService) {
  }

  ngOnInit() {
    this.moduleService.getModules().subscribe(
      modules => this.modules = modules,
      error => console.log(error));
    this.categoryService.getCategories(this.cookie.get('username')).subscribe(
      categories => this.categories = categories,
      error => console.log(error));

    this.refresh();
  }

  ngAfterViewInit() {

  }

  enableElementEditMode(element: SpendElement) {
    element.isEditing = true;
    element.date = this.convertDate(element.date);
  }

  private convertDate(date: Date) {
    let tempDate = new Date(date);
    tempDate.setHours(Math.abs(date.getTimezoneOffset()) / 60);
    return tempDate;
  }

  cancelElementEditMode(element: SpendElement) {
    let objects = this.convertSpendingIntoSpendElements([this.spending[element.position - 1]]);
    this.dataSource.data[element.position - 1] = objects.pop();
    element.isEditing = false;
  }

  cancelNewElementEditMode(element: SpendElement) {
    this.dataSource.data = this.dataSource.data.filter(item => item.position !== element.position);
  }

  updateExistingElement(element: SpendElement) {
    let spend = this.spending[element.position - 1];
    spend.category = element.category;
    spend.date = element.date;
    spend.name = element.name;
    spend.user = new User();
    spend.user.username = this.cookie.get('username');
    spend.value = element.value;
    this.spendingService.updateSpend(spend).subscribe(spend => {
      console.log(spend);
      element.isEditing = false;
    }, error => console.log(error));
  }

  insertElement(element: SpendElement) {
    let spend = new Spend();
    spend.category = element.category;
    spend.date = element.date;
    spend.name = element.name;
    spend.user = new User();
    spend.user.username = this.cookie.get('username');
    spend.value = element.value;
    this.spendingService.addSpend(spend).subscribe(result => {
      console.log(result);
    }, error => console.log(error));
  }

  showDeleteDialog(element: SpendElement): void {
    console.log('showDeleteDialog');
    //TODO
  }

  deleteElement(element: SpendElement) {
    console.log('deleteElement');
    //TODO
  }

  filterCategoriesByModule(element: SpendElement) {
    if (element.module.name !== '') {
      return this.categories.filter(category => category.module.name === element.module.name);
    }
    return [];
  }


  createRowInTable() {
    let element: SpendElement = new SpendElement();
    element.category = new Category();
    element.category.name = '';
    element.module = new Module();
    element.module.name = '';
    element.position = this.dataSource.data.length + 1;
    element.name = '';
    element.isNew = true;
    element.isEditing = true;

    let dataSource = this.dataSource.data;
    dataSource.push(element);
    this.dataSource.data = dataSource;
  }

  private refresh() {
    this.spendingService.getSpending(this.cookie.get('username')).subscribe(
      spending => {
        this.spending = spending;
        this.dataSource.data = this.convertSpendingIntoSpendElements(this.spending);
      },
      error => console.log(error)
    );
  }

  private convertSpendingIntoSpendElements(elements: Spend[]) {
    if (elements.length > 0) {
      let spendingElements: SpendElement[] = [];
      for (let i = 0; i < elements.length; i++) {
        let element: SpendElement = new SpendElement();
        element.position = i + 1;
        element.name = this.spending[i].name;
        element.category = this.spending[i].category;
        element.module = this.spending[i].category.module;
        element.value = this.spending[i].value;
        element.date = new Date(this.spending[i].date);
        spendingElements.push(element);
      }
      return spendingElements;
    }
    return [];
  }

  updateSpendNameOnBlur(name: any, element) {
    this.dataSource.data[element.position - 1].name = name;
  }

  updateSpendDateOnBlur(date: Date, element) {
    console.log(date);
    this.dataSource.data[element.position - 1].date = date;
    console.log(this.dataSource.data[element.position - 1].date);
  }

  updateSpendValueOnBlur(value: number, element) {
    this.dataSource.data[element.position - 1].value = value;
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
}
