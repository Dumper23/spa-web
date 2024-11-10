import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { dniValidator } from '../../../shared/validators/dni-validator';
import { loginPasswordValidator } from '../../../shared/validators/password-validator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ){
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, dniValidator()]],
      password: ['', [Validators.required, loginPasswordValidator()]],
    });
  }

  onSubmit(){
    this.error = '';
    if (this.loginForm.valid) {
      const values = this.loginForm.value;
      this.userService.login(values.dni, values.password).subscribe({
        next:(response)=>{
          console.log(response.login);
          localStorage.setItem('access_token', response.login);
          this.router.navigate(['/private/home']);
        },
        error:(err)=>{
          this.error = err.message;
        }
      });
    }
  }

}
