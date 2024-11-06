import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserData } from '../../../shared/Interfaces/user';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
  ){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      dni: ['', Validators.required],
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
          console.error('Error creating user:', error);
        }
      });
    }
  }

  async navigateToLogin() {
    this.userService.getAllUsers().subscribe((response: UserData) => {
      response.getAllUsers.forEach((user) => {
        console.log(user.Name, user.MiddleName, user.LastName, user.Dni, user.Adult);
      });
    });
  }

}
