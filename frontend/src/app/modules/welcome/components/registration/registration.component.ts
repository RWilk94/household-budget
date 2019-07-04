import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {CustomValidators} from '../../../shared/validators/custom-validators';
import {RegistrationService} from '../../../shared/services/registration.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  alert: Alert;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.user = new User();
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email]),
      password: new FormControl(this.user.password, [
        Validators.required]),
      confirmPassword: new FormControl(this.user.confirmPassword, [
        Validators.required,
        CustomValidators.confirmPassword])
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.user.username = this.registrationForm.get('username').value;
      this.user.email = this.registrationForm.get('email').value;
      this.user.password = this.registrationForm.get('password').value;
      this.user.confirmPassword = this.registrationForm.get('confirmPassword').value;

      this.registrationService.register(this.user).subscribe(data => {
          this.alert = {
            type: 'success',
            message: 'Rejestracja zakończona powodzeniem',
            // message: 'User registered successfully',
          };
        },
        error => this.handleError(error)
      );
    }
  }

  checkFields() {
    const confirmPassword: string = this.registrationForm.get('confirmPassword').value;
    if (confirmPassword !== undefined && confirmPassword !== null && confirmPassword.length !== 0) {
      this.registrationForm.get('confirmPassword').updateValueAndValidity();
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.alert = {
        type: 'danger',
        message: error.error.message,
      };
    }
  }

  closeAlert() {
    this.alert = undefined;
  }

}
