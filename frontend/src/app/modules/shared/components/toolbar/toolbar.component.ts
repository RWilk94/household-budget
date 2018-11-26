import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  logout() {
    this.registrationService.logout();
  }

}
