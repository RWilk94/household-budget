import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {SpendElement} from "./spend-element";
import {Spend} from "../../models/spend";

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  spending: Spend[] = [];

  columns = ['position', 'name', 'module', 'category', 'date', 'value', 'options'];
  width = [5, 40, 10, 15, 10, 10, 10];

  dataSource = new MatTableDataSource<SpendElement>(this.convertSpendingIntoSpendElements());

  constructor() { }

  ngOnInit() {
  }

  private convertSpendingIntoSpendElements() {
    let spendingElements: SpendElement[] = [];
    for (let i = 0; i < this.spending.length; i++) {
      let element: SpendElement = new SpendElement();
      element.position = i + 1;
      element.name = this.spending[i].name;
      element.category = this.spending[i].category;
      element.date = this.spending[i].date;
      element.module = this.spending[i].category.module;
      element.value = this.spending[i].value;
      spendingElements.push(element);
    }
    return spendingElements;
  }

}
