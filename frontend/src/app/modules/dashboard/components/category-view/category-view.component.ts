import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  @Input()
  moduleId: number;

  categories: Category[];

  categoryColumns = [
    {prop: 'name', name: 'NAME'},
    {prop: 'month', name: 'MONTH'},
    {prop: 'year', name: 'YEAR'},
  ];

  constructor(private categoryService: CategoryService, private cookie: CookieService) { }

  ngOnInit() {
    this.categoryService.getCategories(this.cookie.get('username')).subscribe(data => {
      this.categories = data;
      this.categories.forEach(category => category.open = false);
    }, error => console.log(error));
  }

  onRowClick(rowNum: number) {
    this.categories[rowNum].open = !this.categories[rowNum].open;
  }
}
