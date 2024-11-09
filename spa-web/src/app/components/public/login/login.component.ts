import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { dniValidator } from '../../../shared/validators/dni-validator';
import { nameValidator } from '../../../shared/validators/name-validator';
import { loginPasswordValidator } from '../../../shared/validators/password-validator';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

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
