import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {PlannedSpend} from "../models/planned-spend";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlannedSpendingService {

  private url = 'https://rwilk-household-budget.cfapps.io/api/planned-spending/';
  // private url = 'http://localhost:8080/api/planned-spending/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  getPlannedSpending(username: string, categoryId: number, year: number): Observable<PlannedSpend[]> {
    return this.http.get<PlannedSpend[]>(this.url + username + '/' + categoryId + '/' + year);
  }

  savePlannedSpending(plannedSpending: PlannedSpend[]): Observable<PlannedSpend[]> {
    return this.http.put<PlannedSpend[]>(this.url, plannedSpending, {headers: this.header});
  }

}
