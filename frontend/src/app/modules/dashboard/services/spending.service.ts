import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Spend} from "../models/spend";
import {MonthSpending} from "../models/month-spending";
import {CategorySpending} from "../models/category-spending";
import {EnvironmentConfigService} from "../../shared/services/environment-config.service";

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  SPENDING_ENDPOINT_URL = '/api/spending/';
  private readonly requestUrl;
  calendarDate: any;

  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl() + this.SPENDING_ENDPOINT_URL;
  }

  getSpending(username: string): Observable<Spend[]> {
    return this.http.get<Spend[]>(this.requestUrl + username, {headers: this.header});
  }

  getSpendingById(username: string, id: number): Observable<Spend> {
    return this.http.get<Spend>(this.requestUrl + username + '/' + id, {headers: this.header});
  }

  addSpend(spend: Spend): Observable<Spend> {
    return this.http.put<Spend>(this.requestUrl, spend, {headers: this.header});
  }

  updateSpend(spend: Spend): Observable<Spend> {
    return this.http.patch<Spend>(this.requestUrl, spend, {headers: this.header});
  }

  deleteSpend(spend: Spend) {
    return this.http.delete(this.requestUrl + spend.id, {headers: this.header});
  }

  getLastYearSpending(username: string) {
    return this.http.get<MonthSpending[]>(this.requestUrl + username + '/lastYear', {headers: this.header});
  }

  getCurrentMonthSpendingByCategory(username: string) {
    return this.http.get<CategorySpending[]>(this.requestUrl + username + "/currentMonth", {headers: this.header});
  }

  getLastMonthSpendingByCategory(username: string) {
    return this.http.get<CategorySpending[]>(this.requestUrl + username + "/lastMonth", {headers: this.header});
  }
}
