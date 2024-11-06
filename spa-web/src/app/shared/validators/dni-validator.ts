import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dniValue = control.value;

       if (!dniValue) return null;  
  
      const spanishDniPattern = /^\d{8}[A-Za-z]$/;  
  
      if (spanishDniPattern.test(dniValue)) {
        return null;
      }
  
      return { invalidDni: true };
    };
  }