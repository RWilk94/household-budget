import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../models/module";
import {CookieService} from "ngx-cookie-service";
import {Spend} from "../models/spend";
import {ModuleVO} from "../models/moduleVO";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  spend: Spend;

  private url = 'https://rwilk-household-budget.cfapps.io/api/modules/';
  // private url = 'http://localhost:8080/api/modules/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.url, {headers: this.header});
  }

  getModulesVOsByYear(year: number) {
    return this.http.get<ModuleVO[]>(
      this.url + this.cookie.get('username') + '/' + year.toString(),
      {headers: this.header}
    );
  }

  getModulesVOsByMonth(year: number, month: number) {
    return this.http.get<ModuleVO[]>(
      this.url + this.cookie.get('username') + '/' + year.toString() + '/' + month.toString(),
      {headers: this.header}
    );
  }

}
