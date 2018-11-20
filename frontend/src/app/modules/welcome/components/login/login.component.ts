import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {User} from "../../../shared/models/user";
import {RegistrationService} from "../../../shared/services/registration.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.user = new User();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required
      ]),
      password: new FormControl(this.user.password, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user.username = this.loginForm.get('username').value;
      this.user.password = this.loginForm.get('password').value;

      this.registrationService.login(this.user).subscribe(data => {
          console.log('User login successfully ' + JSON.stringify(data));
        },
        error => console.log('Error while login ' + JSON.stringify(error))
      );
    }
  }

}
