import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {CookieService} from 'ngx-cookie-service';
import {ModuleVO} from '../models/moduleVO';
import {EnvironmentConfigService} from '../../shared/services/environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CATEGORY_ENDPOINT_URL = '/api/categories/';
  private readonly requestUrl;

  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl() + this.CATEGORY_ENDPOINT_URL;
  }

  getCategories(username: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.requestUrl + username, {headers: this.header});
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.requestUrl, category, {headers: this.header});
  }

  updateCategory(category: Category): Observable<Category> {
    console.log(JSON.stringify(category));
    return this.http.patch<Category>(this.requestUrl, category, {headers: this.header});
  }

  deleteCategory(category: Category) {
    return this.http.delete(this.requestUrl + category.id, {headers: this.header});
  }

  getCategoryVOsByYear(moduleId: number, year: number) {
    return this.http.get<ModuleVO[]>(
      this.requestUrl + this.cookie.get('username') + '/' + moduleId + '/' + year.toString(),
      {headers: this.header}
    );
  }

  getCategoryVOsByMonth(moduleId: number, year: number, month: number) {
    // console.log('getCategoryVOsByMonth ' + moduleId + ' ' + year + ' ' + month);
    return this.http.get<ModuleVO[]>(
      this.requestUrl + this.cookie.get('username') + '/' + moduleId + '/' + year.toString() + '/' + month.toString(),
      {headers: this.header}
    );
  }

}
