import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if(!password) return null;
    const isValid = /^[a-zA-Z0-9]+$/.test(password);

    if(isValid){
      if(password.length >= 8){
        if(password.length <= 20){
          return null
        }else{
          return { maxLengthError: true };
        }
      }else{
        return { minLengthError: true };
      }
    }
    
    return { invalidPassword: true };
  };
}

