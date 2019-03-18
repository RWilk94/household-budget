import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";
import {CookieService} from "ngx-cookie-service";
import {ModuleVO} from "../models/moduleVO";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'https://rwilk-household-budget.cfapps.io/api/categories/';
  // private url = 'http://localhost:8080/api/categories/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getCategories(username: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + username, {headers: this.header});
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.url, category, {headers: this.header});
  }

  updateCategory(category: Category): Observable<Category> {
    console.log(JSON.stringify(category));
    return this.http.patch<Category>(this.url, category, {headers: this.header});
  }

  deleteCategory(category: Category) {
    return this.http.delete(this.url + category.id, {headers: this.header});
  }

  getCategoryVOsByYear(moduleId: number, year: number) {
    return this.http.get<ModuleVO[]>(
      this.url + this.cookie.get('username') + '/' + moduleId + '/' + year.toString(),
      {headers: this.header}
    );
  }

  getCategoryVOsByMonth(moduleId: number, year: number, month: number) {
    return this.http.get<ModuleVO[]>(
      this.url + this.cookie.get('username') + '/' + moduleId + '/' + year.toString() + '/' + month.toString(),
      {headers: this.header}
    );
  }

}
