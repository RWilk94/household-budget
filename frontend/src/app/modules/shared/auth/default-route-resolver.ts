import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'default-route-resolver',
  template: '',
  styles: []
})
export class DefaultRouteResolver implements OnInit {

  private login = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.login) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

}
