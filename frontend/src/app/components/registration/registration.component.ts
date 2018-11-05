import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  email: FormControl;

  user: User;

  constructor(private formBuilder: FormBuilder) {
    this.user = new User();
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [Validators.required])
    })
  }

}
