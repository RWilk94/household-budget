import { Component, OnInit } from '@angular/core';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';
import {Installment} from './installment';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  alert: Alert;

  creditAmount: number; // = 300000;//kwota
  lendingRate: number; // = 4.7; //oprocentowanie
  creditPeriod: number; // = 300; //okres
  type = 'equal';

  totalCreditCost: number = 0;
  totalCapitalCost: number = 0;
  totalInterestCost: number = 0;

  installments: Installment[] = [];
  private capitalInstallment: number;

  constructor(private navigationMenu: NavigationMenuService) {
    navigationMenu.activeMenuItem('Credits');
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.validateInputData()) {
      this.installments = [];
      if (this.type === 'equal') {
        return this.calculateEqualRates();
      } else if (this.type === 'decreasing') {
        return this.calculateDecreasingRates();
      }
    }
  }

  private validateInputData() {
    this.closeAlert();
    this.installments = [];
    if (this.creditAmount < 0 || this.lendingRate < 0 || this.creditPeriod < 0) {
      this.alert = {
        type: 'danger',
        message: 'Wartości nie mogą być ujemne!',
      };
      return false;
    }
    return true;
  }

  closeAlert() {
    this.alert = undefined;
  }

  private calculateEqualRates() {
    const q = 1 + ((this.lendingRate / 100) / 12);
    const r = (this.creditAmount * (Math.pow(q, this.creditPeriod)) * (q - 1)) / (Math.pow(q, this.creditPeriod) - 1);
    const percent = this.lendingRate / 100 / 12;
    let totalAmount = this.creditAmount;

    for (let i = 0; i < this.creditPeriod; i++) {
      const installment: Installment = new Installment();
      installment.rateAmount = r;
      installment.debt = totalAmount;
      installment.period = i;

      installment.interest = totalAmount * percent;
      installment.capital = installment.rateAmount - installment.interest;

      this.installments.push(installment);
      totalAmount -= installment.capital;
    }
    this.calculateSums(this.installments);
  }

  private calculateDecreasingRates() {
    this.capitalInstallment = this.creditAmount / this.creditPeriod;
    let totalAmount = this.creditAmount;

    for (let i = 0; i < this.creditPeriod; i++) {
      const installment: Installment = new Installment();
      installment.debt = totalAmount;
      installment.capital = this.capitalInstallment;
      installment.period = i;
      installment.interest = (this.creditAmount - (i * this.capitalInstallment)) * (this.lendingRate / 100) / 12;
      installment.rateAmount = installment.interest + installment.capital;

      this.installments.push(installment);
      totalAmount -= this.capitalInstallment;
    }
    this.calculateSums(this.installments);
  }

  private calculateSums(installments) {
    this.totalCreditCost = 0;
    this.totalInterestCost = 0;
    this.totalCapitalCost = 0;

    installments.forEach(installment => {
      this.totalCreditCost += installment.rateAmount;
      this.totalCapitalCost += installment.capital;
      this.totalInterestCost += installment.interest;
    });
  }
}
