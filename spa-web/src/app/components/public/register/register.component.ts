import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { dniValidator } from '../../../shared/validators/dni-validator';
import { nameValidator } from '../../../shared/validators/name-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
  ){
    this.userForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      middleName: [''],
      lastName: [''],
      dni: ['', [Validators.required, dniValidator()]],
      adult: [false]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.addUser(newUser).subscribe({
        next:(response) => {
          console.log('User created successfully:', response);
        },
        error:(error) => {
          this.error = error.message;
        }
      });
    } else {
      this.userForm.markAllAsTouched(); // Ensures all errors are displayed 
    }
  }

}
