import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { dniValidator } from '../../../shared/validators/dni-validator';
import { nameValidator } from '../../../shared/validators/name-validator';
import { passwordValidator } from '../../../shared/validators/password-validator';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
  ){
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, dniValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  onSubmit(){
    this.error = '';
    if (this.loginForm.valid) {
      const values = this.loginForm.value;
      this.userService.login(values.dni, values.password).subscribe({
        next:(response)=>{
          localStorage.setItem('access_token', response);
        },
        error:(err)=>{
          this.error = err.message;
        }
      });
    }
  }

}
