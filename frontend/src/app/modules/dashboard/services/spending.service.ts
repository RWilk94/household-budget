import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Spend} from "../models/spend";

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  private url = 'http://localhost:8080/api/spending/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getSpending(username: string): Observable<Spend[]> {
    return this.http.get<Spend[]>(this.url + username, {headers: this.header});
  }

  addSpend(spend: Spend): Observable<Spend> {
    return this.http.put<Spend>(this.url, spend, {headers: this.header});
  }

  updateSpend(spend: Spend): Observable<Spend> {
    return this.http.patch<Spend>(this.url, spend, {headers: this.header});
  }

  deleteSpend(spend: Spend) {
    return this.http.delete(this.url + spend.id, {headers: this.header});
  }
}
