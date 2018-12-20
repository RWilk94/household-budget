import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Spend} from "../../models/spend";
import {ModuleService} from "../../services/module.service";
import {Router} from "@angular/router";
import {SpendingService} from "../../services/spending.service";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Module} from "../../models/module";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-add-spend',
  templateUrl: './add-spend.component.html',
  styleUrls: ['./add-spend.component.css']
})
export class AddSpendComponent implements OnInit, AfterViewInit {

  spend: Spend = new Spend();
  spendForm: FormGroup;

  modules: Module[] = [];
  categories: Category[] = [];

  constructor(private spendingService: SpendingService,
              private moduleService: ModuleService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookie: CookieService) {
    this.spend.category = new Category();
    this.spend.category.module = new Module();
  }

  ngOnInit() {
      let id: string = this.router.url.toString().substring(this.router.url.toString().lastIndexOf("/") + 1);
      this.spendingService.getSpendingById(this.cookie.get('username'), Number.parseInt(id)).subscribe(spend => {
        this.spend = spend;
      });

    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules;
    }, error => console.log(error));

    this.categoryService.getCategories(this.cookie.get('username')).subscribe(categories => {
      this.categories = categories;
    }, error => console.log(error));

    // this.spendForm = this.formBuilder.group({
    //   name: new FormControl(this.spend.name),
    //   // category: new FormControl(this.spend.category),
    //   //date: new FormControl(this.spend.date),
    //   value: new FormControl(this.spend.value)
    // });

    //this.spendForm.setValue({'value': this.spend.value});
  }

  ngAfterViewInit() {
    // this.spendForm.controls['name'].setValue(this.spend.name); // =this.spend.name;
    // this.spendForm.controls['value'].setValue(this.spend.value); // =this.spend.name;
  }

  onSubmit() {
    console.log('onSubmit');
    // if (this.spendForm.valid) {
    //   this.spend.name = this.spendForm.get('name').value;
    //   console.log(this.spendForm.get('name').value);
      // this.spend.category = this.spendForm.get('category').value;
      // this.spend.date = this.spendForm.get('date').value;
      // this.spend.value = this.spendForm.get('value').value;
      console.log('spend');
      console.log(JSON.stringify(this.spend));
    // }
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
    this.spend.date= date;
  }

  filterCategoriesByModule(spend: Spend) {
    if (spend.category.module.name !== '') {
      return this.categories.filter(category => category.module.name === spend.category.module.name);
    }
    return [];
  }

  selectedCity: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];

}
