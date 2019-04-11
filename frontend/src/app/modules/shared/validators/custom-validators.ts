import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  public static confirmPassword(control: AbstractControl): ValidationErrors | null {
    if (control && control.value !== null || control.value !== undefined) {
      const confirmPasswordValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passwordValue = passControl.value;
        if (passwordValue !== confirmPasswordValue || passwordValue === '') {
          return {
            confirmPassword: true,
            isError: true
          };
        }
      }
    }
    return null;
  }

}
