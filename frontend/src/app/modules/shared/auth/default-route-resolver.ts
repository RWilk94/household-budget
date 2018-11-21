import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../services/registration.service";

@Component({
  selector: 'default-route-resolver',
  template: '',
  styles: []
})
export class DefaultRouteResolver implements OnInit {

  constructor(private router: Router, private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.registrationService.isLogin() ? this.router.navigate(['/dashboard']) : this.router.navigate(['/']);
  }

}
