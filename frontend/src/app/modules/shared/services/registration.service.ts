import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private header = new HttpHeaders({'Content-Type': 'application/json'});
  private link = 'https://rwilk-household-budget.cfapps.io';

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router) {
  }

  register(user: User) {
    let url = this.link + '/registration';
    return this.http.post(url, user, {headers: this.header});
  }

  login(user: User) {
    let url = this.link + '/login';
    return this.http.post(url, user, {headers: this.header});
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  isLogin(): boolean {
    return this.cookie.get('username') != null
      && this.cookie.get('username') != ''
      && this.cookie.get('token') != null
      && this.cookie.get('token') != ''
  }

}
