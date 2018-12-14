import {Component, OnInit} from '@angular/core';
import {SpendingService} from "../../services/spending.service";
import {Chart} from 'chart.js';
import {CookieService} from "ngx-cookie-service";
import {MonthSpending} from "../../models/month-spending";
import {CategorySpending} from "../../models/category-spending";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentMonthSpending: number = -1;
  lastMonthSpending: number = -1;

  chart: any;
  currentMonthCategoryChart: any;
  lastMonthCategoryChart: any;


  constructor(private spendingService: SpendingService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.spendingService.getLastYearSpending(this.cookieService.get('username')).subscribe(data => {
      console.log(this.cookieService.get('username'));
      console.log(JSON.stringify(data));
      if (data.length > 0) {
        this.generateSummaryOfSpendingChart(data);
        this.setCurrentMonthSpending(data[data.length - 1]);
        this.setLastMonthSpending(data[data.length - 2]);
      }
    }, error => console.log(error));

    this.spendingService.getCurrentMonthSpendingByCategory(this.cookieService.get('username')).subscribe(data => {
      this.generateSpendingByCategoryChart(this.currentMonthCategoryChart, 'currentMonthCategoryChart', data);
    });

    this.spendingService.getLastMonthSpendingByCategory(this.cookieService.get('username')).subscribe(data => {
      this.generateSpendingByCategoryChart(this.lastMonthCategoryChart, 'lastMonthCategoryChart', data);
    });

  }

  generateSummaryOfSpendingChart(data: MonthSpending[]) {
    console.log(data);
    let dataArray = [];
    let labels: string[] = [];
    data.forEach(monthSpend => {
      dataArray.push(monthSpend.sum);
      labels.push(monthSpend.month + '/' + monthSpend.year);
    });
    // let colors = ['red', 'green', 'blue', 'yellow'];

    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        datasets: [{
          data: dataArray,
          backgroundColor: 'green'
        }],
        labels: labels
      },
      options: {
        responsible: true,
        legend: {
          display: false
        }
      }
    });
  }

  generateSpendingByCategoryChart(chart: any, name: string, spending: CategorySpending[]) {
    let dataArray = [];
    let labels: string[] = [];
    spending.forEach(categorySpend => {
      dataArray.push(categorySpend.sum);
      labels.push(categorySpend.name);
    });
    let colors = ['red', 'green', 'blue', 'yellow'];

    chart = new Chart(name, {
      type: 'pie',
      data: {
        datasets: [{
          data: dataArray,
          backgroundColor: colors
        }],
        labels: labels
      },
      options: {
        responsible: true,
        legend: {
          display: false
        }
      }
    });
  }

  private setCurrentMonthSpending(monthSpending: MonthSpending) {
    let date = new Date();
    if (date.getMonth() == monthSpending.month - 1 && date.getFullYear() == monthSpending.year) {
      this.currentMonthSpending = monthSpending.sum;
    } else {
      this.currentMonthSpending = 0;
    }
  }

  private setLastMonthSpending(monthSpending: MonthSpending) {
    let date = new Date();
    console.log(date + ' + ' + JSON.stringify(monthSpending) + ' + ' + date.getMonth());
    if (date.getMonth() - 1 == monthSpending.month - 1 && date.getFullYear() == monthSpending.year) {
      this.lastMonthSpending = monthSpending.sum;
    } else {
      this.lastMonthSpending = 0;
    }
  }

}
