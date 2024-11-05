import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../shared/services/user.service';
import { UserData } from '../../../shared/Interfaces/User';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ){}

  async navigateToLogin() {
    this.userService.getUsers().subscribe((res: UserData) => {
      res.getAllUsers.forEach((user) => {
        console.log(user.Name, user.MiddleName, user.LastName, user.Dni, user.Adult);
      });
    });
  }

}
