import {Component, OnInit} from '@angular/core';
import {SpendingService} from "../../services/spending.service";
import {Chart} from 'chart.js';
import {CookieService} from "ngx-cookie-service";
import {MonthSpending} from "../../models/month-spending";
import {Spend} from "../../models/spend";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentMonthSpending: number = -1;
  lastMonthSpending: number = -1;

  chart: any;


  constructor(private spendingService: SpendingService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.spendingService.getLastYearSpending(this.cookieService.get('username')).subscribe(data => {
      this.generateSummaryOfSpendingChart(data);
      this.setCurrentMonthSpending(data[data.length - 1]);
      this.setLastMonthSpending(data[data.length - 2]);
    }, error => console.log(error));

    this.spendingService.getCurrentMonthSpendingByCategory(this.cookieService.get('username')).subscribe(data => {
      this.generateSpendingByCategoryChart(data);
    })

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

    this.chart = new Chart('canvas', {
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

  generateSpendingByCategoryChart(spending: Spend[]) {
    //TODO get data from database and create chart
  }

  private setCurrentMonthSpending(monthSpending: MonthSpending) {
    let date = new Date();
    if (date.getMonth() == monthSpending.month-1 && date.getFullYear() == monthSpending.year) {
      this.currentMonthSpending = monthSpending.sum;
    } else {
      this.currentMonthSpending = 0;
    }
  }

  private setLastMonthSpending(monthSpending: MonthSpending) {
    let date = new Date();
    console.log(date + ' + ' + JSON.stringify(monthSpending) + ' + ' + date.getMonth());
    if (date.getMonth()-1 == monthSpending.month-1 && date.getFullYear() == monthSpending.year) {
      this.lastMonthSpending = monthSpending.sum;
    } else {
      this.lastMonthSpending = 0;
    }
  }

}
