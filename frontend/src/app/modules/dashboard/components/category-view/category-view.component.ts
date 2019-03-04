import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {CookieService} from "ngx-cookie-service";
import {ModuleVO} from "../../models/moduleVO";

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

  categories: Category[];
  categoryVOs: ModuleVO[];

  moduleColumns = [
    {prop: 'name', name: 'Nazwa'},
    {prop: 'plannedSpend', name: 'Planowane wydatki'},
    {prop: 'actualSpend', name: 'Rzeczywiste wydatki'},
    {prop: 'difference', name: 'Różnica'},
    {prop: 'percent', name: 'Stopień realizacji budżetu'},
    {prop: 'option', name: 'Akcje'},
  ];

  constructor(private categoryService: CategoryService, private cookie: CookieService) { }

  ngOnInit() {
    this.categoryService.getCategories(this.cookie.get('username')).subscribe(data => {
      this.categories = data;
      this.categories.forEach(category => category.open = false);
    }, error => console.log(error));

    this.categoryService.getCategoryVOs(new Date(this.selectedYear, this.selectedMonth), this.type, this.moduleId).subscribe(data => {
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

  }

  onRowClick(rowNum: number) {
    console.log(this.categories);
    console.log(this.categories[rowNum]);
    this.categories[rowNum].open = !this.categories[rowNum].open;
  }
}
