import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../models/module";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private url = 'https://rwilk-household-budget.cfapps.io/api/modules/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.url, {headers: this.header});
  }

}
