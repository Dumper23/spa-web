import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserData } from '../../../shared/Interfaces/user';
import { CommonModule } from '@angular/common';
import { dniValidator } from '../../../shared/validators/dni-validator';
import { nameValidator } from '../../../shared/validators/name-validator';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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

  async checkUsers() {
    this.userService.getAllUsers().subscribe((response: UserData) => {
      let a = 0;
      response.getAllUsers.forEach((user) => {
        console.log(a, user.Name, user.MiddleName, user.LastName, user.Dni, user.Adult);
        a++;
      });
    });
  }

}
