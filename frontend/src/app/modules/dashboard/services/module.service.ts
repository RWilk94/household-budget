import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Module} from '../models/module';
import {CookieService} from 'ngx-cookie-service';
import {ModuleVO} from '../models/moduleVO';
import {EnvironmentConfigService} from '../../shared/services/environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  MODULE_ENDPOINT_URL = '/api/modules/';
  private readonly requestUrl;

  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl() + this.MODULE_ENDPOINT_URL;
  }

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.requestUrl, {headers: this.header});
  }

  getModulesVOsByYear(year: number) {
    return this.http.get<ModuleVO[]>(
      this.requestUrl + this.cookie.get('username') + '/' + year.toString(),
      {headers: this.header}
    );
  }

  getModulesVOsByMonth(year: number, month: number) {
    return this.http.get<ModuleVO[]>(
      this.requestUrl + this.cookie.get('username') + '/' + year.toString() + '/' + month.toString(),
      {headers: this.header}
    );
  }

}
