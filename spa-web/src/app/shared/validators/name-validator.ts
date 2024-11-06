import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    if(!name) return null;
    const isValid = /^[a-zA-Z]+$/.test(name);
    if(isValid){
      if(name.length > 1){
        if(name.length < 15){
          return null
        }else{
          return { maxLengthError: true };
        }
      }else{
        return { minLengthError: true };
      }
    }
    return { invalidName: true };
  };
}

