import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from "@angular/router";
import {RegistrationService} from "../services/registration.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public router: Router, private registrationService: RegistrationService) {
  }

  canActivate(): boolean {
    return !this.registrationService.isLogin();
  }

  canLoad() {
    return this.canActivate();
  }
}
