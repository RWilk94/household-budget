import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SpendElement} from "./spend-element";
import {Spend} from "../../models/spend";
import {CategoryService} from "../../services/category.service";
import {ModuleService} from "../../services/module.service";
import {Toast, ToasterService} from "angular2-toaster";
import {Module} from "../../models/module";
import {Category} from "../../models/category";
import {CookieService} from "ngx-cookie-service";
import {SpendingService} from "../../services/spending.service";
import {FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/user";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {ToastBuilder} from "../../../shared/utils/toast-builder";

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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
              private cookie: CookieService,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pl');
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': {
          return item.name.toUpperCase();
        }
        case 'module': {
          return item.module.name.toUpperCase();
        }
        case 'category': {
          return item.category.name.toUpperCase();
        }
        default: {
          return item[property];
        }
      }
    };

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
    let originalRow = this.spending[element.position - 1];
    this.dataSource.data[element.position - 1].name = originalRow.name;
    this.dataSource.data[element.position - 1].module = originalRow.category.module;
    this.dataSource.data[element.position - 1].category = originalRow.category;
    this.dataSource.data[element.position - 1].value = originalRow.value;
    element.isEditing = false;
  }

  cancelNewElementEditMode(element: SpendElement) {
    this.dataSource.data = this.dataSource.data.filter(item => item.position !== element.position);
  }

  updateExistingElement(element: SpendElement) {
    console.log(JSON.stringify(element));
    if (this.validateSpendingElement(element)) {
      let spend = this.spending[element.position - 1];
      spend.category = element.category;
      spend.date = element.date;
      spend.name = element.name;
      spend.user = new User();
      spend.user.username = this.cookie.get('username');

      let val = Number(element.value);
      spend.value = Number(val.toFixed(2));
      element.value = Number(spend.value);

      this.spendingService.updateSpend(spend).subscribe(spend => {
        console.log(spend);
        this.displayToast(ToastBuilder.successUpdateItem());
        element.isEditing = false;
      }, error => {
        this.displayToast(ToastBuilder.errorWhileUpdatingItem());
        console.log(error);
      });
    }
  }

  insertElement(element: SpendElement) {
    if (this.validateSpendingElement(element)) {
      let spend = new Spend();
      spend.category = element.category;
      spend.date = element.date;
      spend.name = element.name;
      spend.user = new User();
      spend.user.username = this.cookie.get('username');

      let val = Number(element.value);
      spend.value = Number(val.toFixed(2));
      element.value = Number(spend.value);

      this.spendingService.addSpend(spend).subscribe(result => {
        this.displayToast(ToastBuilder.successInsertItem());
        this.spending[element.position - 1] = result;
        element.isNew = false;
        element.isEditing = false;
      }, error => {
        this.displayToast(ToastBuilder.errorWhileInsertingItem());
        console.log(error);
      });
    }
  }

  showDeleteDialog(element: SpendElement): void {
    console.log('showDeleteDialog');
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        this.deleteElement(element);
      }
    });
  }

  deleteElement(element: SpendElement) {
    console.log('deleteElement');
    let spend = this.spending[element.position - 1];
    this.spendingService.deleteSpend(spend).subscribe(data => {
      this.displayToast(ToastBuilder.successDeleteItem());
      this.refresh();
    }, error => {
      this.displayToast(ToastBuilder.errorWhileDeletingItem());
      console.log(error);
    });
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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  private validateSpendingElement(element: SpendElement): boolean {
    if (element.name === null || element.name === undefined || element.name.length === 0) {
      this.displayToast(ToastBuilder.errorEmptyName());
      return false;
    } else if (element.name.length < 1 || element.name.length > 255) {
      this.displayToast(ToastBuilder.errorIncorrectName());
      return false;
    } else if (element.module === null || element.module === undefined || element.module.name === '') {
      this.displayToast(ToastBuilder.errorEmptyModule());
      return false;
    } else if (element.category === null || element.category === undefined || element.category.name === '') {
      this.displayToast(ToastBuilder.errorEmptyCategory());
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

  updateSpendNameOnBlur(name: any, element) {
    this.dataSource.data[element.position - 1].name = name;
  }

  updateSpendDateOnBlur(date: Date, element) {
    this.dataSource.data[element.position - 1].date = date;
  }

  updateSpendValueOnBlur(value: number, element) {
    this.dataSource.data[element.position - 1].value = value;
  }

  private displayToast(toast: Toast): void {
    this.toasterService.pop(toast);
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
