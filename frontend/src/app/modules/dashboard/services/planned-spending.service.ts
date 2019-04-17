import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {PlannedSpend} from '../models/planned-spend';
import {Observable} from 'rxjs';
import {EnvironmentConfigService} from '../../shared/services/environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class PlannedSpendingService {

  PLANNED_SPENDING_ENDPOINT_URL = '/api/planned-spending/';
  private readonly requestUrl;

  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl() + this.PLANNED_SPENDING_ENDPOINT_URL;
  }

  getPlannedSpending(username: string, categoryId: number, year: number): Observable<PlannedSpend[]> {
    return this.http.get<PlannedSpend[]>(this.requestUrl + username + '/' + categoryId + '/' + year);
  }

  savePlannedSpending(plannedSpending: PlannedSpend[]): Observable<PlannedSpend[]> {
    return this.http.put<PlannedSpend[]>(this.requestUrl, plannedSpending, {headers: this.header});
  }

}
