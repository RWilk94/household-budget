import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../services/registration.service';

@Component({
  selector: 'app-default-route-resolver',
  template: '',
  styles: []
})
export class DefaultRouteResolverComponent implements OnInit {

  constructor(private router: Router, private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.registrationService.isLogin() ? this.router.navigate(['/dashboard']) : this.router.navigate(['/']);
  }

}
