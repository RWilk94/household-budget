import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private header = new HttpHeaders({'Content-Type': 'application/json'});
  private link = 'https://rwilk-household-budget.cfapps.io';

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    console.log('register: ' + JSON.stringify(user));
    // let url = 'http://localhost:8888/registration';
    let url = this.link + '/registration';
    return this.http.post(url, user, {headers: this.header});
  }

  login(user: User) {
    console.log('login: ' + JSON.stringify(user));
    // let url = 'http://localhost:8888/login';
    let url = this.link + '/login';
    return this.http.post(url, user, {headers: this.header});
  }

}
