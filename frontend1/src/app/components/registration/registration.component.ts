import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {CustomValidators} from "../../validators/custom-validators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  private user: User = new User();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required]),
      confirmPassword: new FormControl(this.user.confirmPassword, [Validators.required, CustomValidators.confirmPassword])
    });
  }

  getUsernameErrorMessage() {
    return this.registrationForm.get('username').hasError('required') ? 'Username can not be empty.' : '';
  }

  getEmailErrorMessage() {
    return this.registrationForm.get('email').hasError('required') ? 'Email can not be empty.' :
      'Email has invalid format.';
  }

  getPasswordErrorMessage() {
    return this.registrationForm.get('password').hasError('required') ? 'Password can not be empty.' : '';
  }

  getConfirmPasswordErrorMessage() {
    return this.registrationForm.get('confirmPassword').hasError('required')
      ? 'Confirm password can not be empty.' :
      this.registrationForm.get('confirmPassword').hasError('confirmPassword')
        ? 'Password and confirm password must be the same.' :
        '';
  }
}
