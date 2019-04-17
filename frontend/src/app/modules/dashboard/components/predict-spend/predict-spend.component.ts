import {Component, OnInit} from '@angular/core';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';
import {Chart} from 'chart.js';
import {CategoryService} from '../../services/category.service';
import {CookieService} from 'ngx-cookie-service';
import {Category} from '../../models/category';
import {SpendingService} from '../../services/spending.service';
import {Spend} from '../../models/spend';
import {PredictSpendService} from '../../services/predict-spend.service';

@Component({
  selector: 'app-predict-spend',
  templateUrl: './predict-spend.component.html',
  styleUrls: ['./predict-spend.component.css']
})
export class PredictSpendComponent implements OnInit {

  heatingChart: any;
  phoneChart: any;
  private categories: Category[];
  private predictValue: number;

  constructor(private categoryService: CategoryService,
              private spendingService: SpendingService,
              private predictService: PredictSpendService,
              private cookieService: CookieService,
              private navigationMenu: NavigationMenuService) {
    navigationMenu.activeMenuItem('Prognozy');
  }

  ngOnInit() {

    this.categoryService.getCategories(this.cookieService.get('username')).subscribe(categories => {
      this.categories = categories;
      const heatingCategory = this.categories.filter(category => category.name.toUpperCase() === 'OGRZEWANIE' && category.module.id === 1);
      const phoneCategory = this.categories.filter(category => category.name.toUpperCase() === 'TELEFON' && category.module.id === 4);

      this.spendingService.getSpending(this.cookieService.get('username')).subscribe(spending => {
        let heatingSpending = spending.filter(spend => spend.category.id === heatingCategory[0].id);
        heatingSpending = heatingSpending.sort((a, b) => {
          return <any>new Date(a.date) - <any>new Date(b.date);
        });
        this.predictService.getPredictedValue(this.cookieService.get('username'), heatingCategory[0].id).subscribe(predictValue => {
          this.predictValue = predictValue;
          this.generateSummaryOfSpendingChart(this.heatingChart, 'heatingChart', heatingSpending);
        }, error => console.log(error));
      }, error => console.log(error));

      this.spendingService.getSpending(this.cookieService.get('username')).subscribe(spending => {
        let phoneSpending = spending.filter(spend => spend.category.id === phoneCategory[0].id);
        phoneSpending = phoneSpending.sort((a, b) => {
          return <any>new Date(a.date) - <any>new Date(b.date);
        });
        this.predictService.getPredictedValue(this.cookieService.get('username'), phoneCategory[0].id).subscribe(predictValue => {
          this.predictValue = predictValue;
          this.generateSummaryOfSpendingChart(this.phoneChart, 'phoneChart', phoneSpending);
        }, error => console.log(error));
      }, error => console.log(error));

    }, error => console.log(error));
  }

  generateSummaryOfSpendingChart(chart: any, name: string, data: Spend[]) {
    const dataArray = [];
    const labels: string[] = [];
    data.forEach(spend => {
      dataArray.push(Math.round(spend.value * 100) / 100);
      const date = new Date(spend.date);
      labels.push((date.getMonth() + 1).toString() + '/' + date.getFullYear().toString());
    });

    // add predict value
    dataArray.push(Math.round(this.predictValue * 100) / 100);
    labels.push('Prognozowana wartość');

    chart = new Chart(name, {
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
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    });
  }

}
