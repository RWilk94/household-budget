import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {EnvironmentConfigService} from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly requestUrl;
  private header = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router,
              private envConfig: EnvironmentConfigService) {
    this.requestUrl = this.envConfig.getBackendUrl();
  }

  register(user: User) {
    const url = this.requestUrl + '/registration';
    return this.http.post(url, user, {headers: this.header});
  }

  login(user: User) {
    const url = this.requestUrl + '/login';
    this.cookie.set('username', user.username);
    return this.http.post(url, user, {headers: this.header});
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  isLogin(): boolean {
    return this.cookie.get('username') !== null
      && this.cookie.get('username') !== ''
      && this.cookie.get('token') !== null
      && this.cookie.get('token') !== '';
  }

}
