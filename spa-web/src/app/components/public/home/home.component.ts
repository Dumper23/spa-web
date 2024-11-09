import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserData } from '../../../shared/Interfaces/user';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private readonly userService: UserService,
  ){}

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
