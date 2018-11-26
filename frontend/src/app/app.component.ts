import { Component } from '@angular/core';
import {RegistrationService} from "./modules/shared/services/registration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public registrationService: RegistrationService) {}

}
