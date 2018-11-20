import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(public router: Router) {
  }

  canActivate(): boolean {
    this.router.navigate(["/dashboard"]);
    return false;
  }

  canActivateChild(): boolean {
    console.log("CanActivateChild");
    this.router.navigate(['/welcome']);
    return false;
  }
}
