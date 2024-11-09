import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function registerPasswordValidator(): ValidatorFn {
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

export function loginPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if(!password) return null;
    const isValid = /^[a-zA-Z0-9]+$/.test(password);

    if(isValid){
      return null
    }
    
    return { invalidPassword: true };
  };
}

