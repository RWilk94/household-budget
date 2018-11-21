import {Injectable} from '@angular/core';
import {CanActivate, CanLoad} from "@angular/router";
import {RegistrationService} from "../services/registration.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate, CanLoad {

  constructor(private registrationService: RegistrationService) {
  }

  canActivate() {
    return this.registrationService.isLogin();
  }

  canLoad() {
    return this.canActivate();
  }

}
