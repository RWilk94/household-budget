import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {EnvironmentConfigService} from '../../shared/services/environment-config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictSpendService {

  PREDICT_SPEND_ENDPOINT_URL = '/api/predict?';
  private readonly requestUrl;

  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookie.get('token')});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl() + this.PREDICT_SPEND_ENDPOINT_URL;
  }

  getPredictedValue(username: string, categoryId: number): Observable<number> {
    return this.http.get<number>(this.requestUrl + username,
      {
        headers: this.header,
        params: {
          username: username,
          categoryId: categoryId.toString()
        }
      });
  }

}
