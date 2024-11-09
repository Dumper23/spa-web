import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserData } from '../../../shared/Interfaces/user';

@Component({
  selector: 'app-private-home',
  standalone: true,
  imports: [],
  templateUrl: './private-home.component.html',
  styleUrl: './private-home.component.scss'
})
export class PrivateHomeComponent {

  constructor(private readonly userService: UserService){}

  
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
